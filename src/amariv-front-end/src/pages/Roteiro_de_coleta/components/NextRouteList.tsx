import React from "react";
import { NextRouteItem } from "./NextRouteItem";
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { ReadColetaDto } from "../../../models/ColetaDtos/ReadColetaDto";
import {
  Active,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors
} from '@dnd-kit/core';




/**
 * Animation
 */

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4"
      }
    }
  })
};

/**
 * NextRouteListProps
 */
export type NextRouteListProps = {
  routes: ReadColetaDto[],
  onClickItem: (item: ReadColetaDto) => void,
  onChangeRoutes: (newRoutes: ReadColetaDto[]) => void,
};

/**
 * NextRouteList
 */

export function NextRouteList({ routes, onClickItem, onChangeRoutes }: NextRouteListProps) {
  const [active, setActive] = React.useState<Active | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 10,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const activeItem = React.useMemo(() => routes.find((r) => r.id === active?.id),
    [active, routes]
  );

  /**
   * Events
   */

  const handleOnDragStart = React.useCallback(({ active }: DragStartEvent): void => {
    setActive(active);
  }, []);

  const handleOnDragEnd = React.useCallback(({ over, active }: DragEndEvent): void => {
    if (over && active.id !== over?.id) {
      const activeIndex = routes.findIndex(({ id }) => id === active.id);
      const overIndex = routes.findIndex(({ id }) => id === over.id);
      onChangeRoutes(arrayMove(routes, activeIndex, overIndex));
    }
    setActive(null);
  }, [onChangeRoutes, routes]);

  /**
   * Layout
   */

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleOnDragStart}
      onDragEnd={handleOnDragEnd}
    >
      <SortableContext items={routes.map((r) => ({ id: r.id! }))}>
        <div className="w-full">
          {routes.map((route, index) => (
            <NextRouteItem
              key={route.id}
              position={index + 1} route={route}
              onClickItem={onClickItem} />
          ))}
        </div>
      </SortableContext>
      {activeItem !== undefined ??
        <DragOverlay dropAnimation={dropAnimationConfig} >
          <NextRouteItem position={0} route={activeItem!} onClickItem={() => { }} />
        </DragOverlay>}
    </DndContext>
  );
}
