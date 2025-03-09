import React, { act, useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress"
import Confetti from '../../ui/confetti';
import confetti from "canvas-confetti";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";


function Roadmap(props){
  
    const [roadmap,setRoadmap]  = useState(props.roadmap);
    const [columns,setColumns] = useState([
      {id: "remaining", title: "Remaining", cards: props.roadmap.resourceList.filter(item => (!(props.roadmap.ongoing.some(og => og.id == item.id)) && !(props.roadmap.completed.some(cp => cp.id == item.id))))},
      {id: "ongoing", title: "On-going", cards: props.roadmap.ongoing},
      {id: "completed", title: "Completed", cards: props.roadmap.completed},
    ]);
    const [progress,setProgress] = useState(props.roadmap.progress);
    const noOfResources = props.roadmap.resourceList.length;
  
    // console.log(columns)

    useEffect(() => {
        
        setProgress((columns.find(col => col.id == 'completed').cards.length)/noOfResources * 100);
    },[columns]);


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    
      

    useEffect(()=>{
        if(progress == 100){
            let duration = 5 * 1000;
            let animationEnd = Date.now() + duration;
            let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10 };
         
            let randomInRange = (min, max) =>
              Math.random() * (max - min) + min;
         
            let interval = window.setInterval(() => {
              let timeLeft = animationEnd - Date.now();
         
              if (timeLeft <= 0) {
                return clearInterval(interval);
              }
         
              let particleCount = 50 * (timeLeft / duration);
              confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
              });
              confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
              });
            }, 250);
        };
    },[progress]);

    const Card = ({ id, title }) => {
      const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: id
      });
    
      const style = {
        transition,
        transform: CSS.Transform.toString(transform)
      };
    
      return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className='bg-white p-2 text-lg rounded-md'>
          <div id={id}>
            <p>{title}</p>
          </div>
        </div>
      );
    };

    const Column = ({ id, title, cards }) => {
      const { setNodeRef } = useDroppable({ id: id });
      return (
        <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
          <div
            ref={setNodeRef}
            className='flex flex-col w-full overflow-x-hidden gap-2 p-2 h-[80%] overflow-y-auto custom-scrollbar'
          >
            
            {cards.map((card) => (
              card!=null ? <Card key={card.id} id={card.id} title={card.title}></Card> : null
            ))}
          </div>
        </SortableContext>
      );
    };

    const findColumn = (unique) => {
      if (!unique) {
        return null;
      }
      if (columns.some((c) => c.id === unique)) {
        return columns.find((c) => c.id === unique) ?? null;
      }
      const id = String(unique);
      const itemWithColumnId = columns.flatMap((c) => {
        const columnId = c.id;
        c.cards = c.cards.filter(i => i != null)
        return c.cards.map((i) => ({ itemId: i.id, columnId: columnId }));
      });
      const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
      return columns.find((c) => c.id === columnId) ?? null;
    };
  
    const handleDragOver = (event) => {
      const { active, over, delta } = event;
      const activeId = String(active.id);
      const overId = over ? String(over.id) : null;
      console.log(overId,activeId);
      const activeColumn = findColumn(activeId);
      const overColumn = findColumn(overId);
      console.log(overColumn,activeColumn);
      if (!activeColumn || !overColumn || activeColumn === overColumn) {
        return null;
      }
      setColumns((prevState) => {
        const activeItems = activeColumn.cards;
        const overItems = overColumn.cards;
        const activeIndex = activeItems.findIndex((i) => i.id === activeId);
        const overIndex = overItems.findIndex((i) => i.id === overId);
        const newIndex = () => {
          const putOnBelowLastItem =
            overIndex === overItems.length - 1 && delta.y > 0;
          const modifier = putOnBelowLastItem ? 1 : 0;
          return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        };
        return prevState.map((c) => {
          if (c.id === activeColumn.id) {
            c.cards = activeItems.filter((i) => i.id !== activeId);
            return c;
          } else if (c.id === overColumn.id) {
            c.cards = [
              ...overItems.slice(0, newIndex()),
              activeItems[activeIndex],
              ...overItems.slice(newIndex(), overItems.length)
            ];
            return c;
          } else {
            return c;
          }
        });
      });
    };
  
    const handleDragEnd = (event) => {
      const { active, over } = event;
      const activeId = String(active.id);
      const overId = over ? String(over.id) : null;
      const activeColumn = findColumn(activeId);
      const overColumn = findColumn(overId);
      if (!activeColumn || !overColumn || activeColumn !== overColumn) {
        return null;
      }
      const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
      const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
      if (activeIndex !== overIndex) {
        setColumns((prevState) => {
          return prevState.map((column) => {
            if (column.id === activeColumn.id) {
              column.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
              return column;
            } else {
              return column;
            }
          });
        });
      }
    };

    return (
        <div className='h-full w-full ml-10 mb-4'>
            <h1 className='text-center font-display text-4xl my-4 py-4 border-b-2'>
                {roadmap.title}
            </h1>
            <div className="flex flex-row h-[55vh]">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                >
                    {columns.map((column) => (

                        <div key={column.id} className="px-2 flex-1 border-x-2">
                            <h1 className='text-center text-lg shadow-lg py-2 border-b-2 border-b-black'>{column.title}</h1>

                            <Column
                              key={column.id}
                              id={column.id}
                              title={column.title}
                              cards={column.cards}
                            ></Column>

                        </div>
                    ))}
                    
                </DndContext>
            </div>
            <div>
                <h1 className='text-center font-semibold text-4xl mt-4 pt-4'>
                    Your Progress
                </h1>
                <h1 className='text-center font-semibold text-xl mb-4 py-4 border-b-2'>
                    {progress.toFixed(2)}%
                </h1>
                <Progress value={progress}></Progress>
            </div>
        </div>
    )
}

export default Roadmap