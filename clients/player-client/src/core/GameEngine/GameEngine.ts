import React, { useEffect, useRef, useState } from 'react';
import { useInputContext } from '../../context/Input/useInputContext';
import { InputEventRecordKey } from '../../dtos/Player/InputEventRecordKey.type';
import { GameState } from '../../dtos/GameState.dto';
import { InputEventRecord } from '../../dtos/Player/InputEventRecord.dto';
import { DateTime, Duration } from 'luxon';
import { InputActionType } from '../../context/Input/InputActionType.type';
import { ActorOrientation } from '../../dtos/Actor/ActorOrientation.type';
import { Coordinate3d } from '../../dtos/Coordinate3d.dto';
import { WalkAction } from '../../dtos/Actions/WalkAction';
import { Actor } from '../../dtos/Actor/Actor.dto';
import { GridField } from '../../dtos/Grid/GridItem.dto';

export type GameEngineProps = {
  data: GameState;
  updateData: (newData: any) => void;
};

export const GameEngine: React.FC<GameEngineProps> = props => {
  const { data, updateData } = props;
  const inputContext = useInputContext();
  const inputContextRef = useRef(inputContext);
  const [lastProcessedInput, setLastProcessedInput] =
    useState<InputEventRecord>({
      key: InputEventRecordKey.DEBUG,
      timestamp: DateTime.now(),
    });

  useEffect(() => {
    inputContextRef.current = inputContext;
  }, [inputContext]);

  const isGridTraversable = (
    grid: GridField[][][],
    actor: Actor,
    targetPosition: Coordinate3d,
  ): boolean => {
    const targetSurfaceGrid =
      grid?.[targetPosition.z]?.[targetPosition.y]?.[targetPosition.x] ?? null;
    const targetAreaGrid =
      grid?.[targetPosition.z + 1]?.[targetPosition.y]?.[targetPosition.x] ??
      null;

    console.log(actor.position.grid);
    console.log(actor.position.sub);
    if (!targetSurfaceGrid || !targetSurfaceGrid.spriteId) {
      return false;
    }

    if (!targetSurfaceGrid.collisionId && !targetAreaGrid?.collisionId) {
      return true;
    }

    let isGridTraversableResults = true;

    data.collisions?.forEach(collision => {
      if (
        collision.isWalkable === false &&
        collision.id === targetSurfaceGrid.collisionId
      ) {
        isGridTraversableResults = false;
      }

      if (
        collision.defaultCollision === true &&
        collision.id === targetAreaGrid.collisionId
      ) {
        isGridTraversableResults = false;
      }
    });

    // TODO add support for sub grid collision checks
    if (actor.position.subY > 0.5) {
      // check bottom square too to avoid clipping issues
      // && !isGridTraversable(data, actor, {
      //   z: actor.position.gridZ,
      //   y: actor.position.gridY + 1,
      //   x: actor.position.gridX,
      // })){
      console.log('not traversable');
      //     isGridTraversableResults = false;
      // }
    }

    // TODO add direction support for stairs, etc.
    return isGridTraversableResults;
  };

  // run 24 times per second
  useEffect(() => {
    const interval = setInterval(() => {
      const actorIndex = 0;
      const actor = data.actors[actorIndex];

      actor.processActions();
    }, 10000 / 24);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // TODO automate this
    const actorIndex = 0;
    const actor = data.actors[actorIndex];

    if (
      !inputContext.state.key ||
      !inputContext.state.timestamp ||
      (lastProcessedInput.key === inputContext.state.key &&
        lastProcessedInput.timestamp === inputContext.state.timestamp)
    ) {
      return;
    }

    if (actor.actions?.length > 0) {
      return;
    }

    const walkAction = new WalkAction({
      wait: Duration.fromObject({ seconds: 0 }),
      act: Duration.fromObject({ seconds: 0.2 }),
      recovery: Duration.fromObject({ seconds: 0 }),
      gridDelta: 0.5,
      framesPerAction: 5,
      spriteMapFrames: 10,
    });

    switch (inputContext.state.key) {
      case InputEventRecordKey.LEFT:
        if (
          actor.position.subX - walkAction.gridDelta >= 0.6 ||
          isGridTraversable(data.grid, actor, {
            z: data.actors[actorIndex].position.gridZ,
            y: data.actors[actorIndex].position.gridY,
            x: Math.floor(
              data.actors[actorIndex].position.x - walkAction.gridDelta,
            ),
          })
        ) {
          walkAction.direction = ActorOrientation.NORTHWEST;
          data.actors[actorIndex].addAction(walkAction);
        } else {
          data.actors[actorIndex].orientation = ActorOrientation.NORTHWEST;
        }
        break;
      case InputEventRecordKey.RIGHT:
        if (
          actor.position.subX + walkAction.gridDelta <= 0.6 ||
          isGridTraversable(data.grid, actor, {
            z: data.actors[actorIndex].position.gridZ,
            y: data.actors[actorIndex].position.gridY,
            x: Math.round(
              data.actors[actorIndex].position.x + walkAction.gridDelta,
            ),
          })
        ) {
          walkAction.direction = ActorOrientation.SOUTHEAST;
          data.actors[actorIndex].addAction(walkAction);
        } else {
          data.actors[actorIndex].orientation = ActorOrientation.SOUTHEAST;
        }

        break;
      case InputEventRecordKey.UP:
        if (
          actor.position.subY - walkAction.gridDelta >= 0.6 ||
          isGridTraversable(data.grid, actor, {
            z: data.actors[actorIndex].position.gridZ,
            y: Math.floor(
              data.actors[actorIndex].position.y - walkAction.gridDelta - 0.4,
            ),
            x: data.actors[actorIndex].position.gridX,
          })
        ) {
          walkAction.direction = ActorOrientation.NORTHEAST;
          data.actors[actorIndex].addAction(walkAction);
        } else {
          data.actors[actorIndex].orientation = ActorOrientation.NORTHEAST;
        }

        break;
      case InputEventRecordKey.DOWN:
        if (
          actor.position.subY + walkAction.gridDelta <= 0.5 ||
          isGridTraversable(data.grid, actor, {
            z: data.actors[actorIndex].position.gridZ,
            y: Math.floor(
              data.actors[actorIndex].position.y + walkAction.gridDelta + 0.5,
            ),
            x: data.actors[actorIndex].position.gridX,
          })
        ) {
          walkAction.direction = ActorOrientation.SOUTHWEST;
          data.actors[actorIndex].addAction(walkAction);
        } else {
          data.actors[actorIndex].orientation = ActorOrientation.SOUTHWEST;
        }
        break;
      case InputEventRecordKey.DEBUG:
        inputContext.dispatch({
          type: InputActionType.SET_DEBUG,
          payload: { debug: inputContext.state.debug ? false : true },
        });
        break;
    }
    setLastProcessedInput({
      key: inputContext.state.key,
      timestamp: inputContext.state.timestamp,
    });

    updateData(data);
  }, [inputContext.state, lastProcessedInput, data, updateData]);

  return null;
};
