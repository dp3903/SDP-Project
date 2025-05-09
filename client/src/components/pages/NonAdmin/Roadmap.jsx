import { useContext, useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import confetti from "canvas-confetti"
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import AuthContext from "../AuthContext"

function Roadmap(props) {

  const {token} = useContext(AuthContext)

  const [roadmap, setRoadmap] = useState(props.roadmap)
  const [columns, setColumns] = useState([
    { id: "remaining", title: "Remaining", cards: props.roadmap.remaining },
    { id: "ongoing", title: "On-goinng", cards: props.roadmap.ongoing },
    { id: "completed", title: "Completed", cards: props.roadmap.completed },
  ])
  const [progress, setProgress] = useState(props.roadmap.progress)
  const noOfResources = props.roadmap.remaining.length + props.roadmap.ongoing.length + props.roadmap.completed.length

  // console.log(columns)

  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // update the final result on dismounting
  useEffect(()=>{
    return async ()=>{
      let updated_roadmap = {
        ...roadmap,
        'remaining': columns.find((col) => col.id == "remaining").cards,
        'ongoing': columns.find((col) => col.id == "ongoing").cards,
        'completed': columns.find((col) => col.id == "completed").cards,
        'progress': ((columns.find((col) => col.id == "completed").cards.length / noOfResources) * 100) || 0,
      }
      console.log(updated_roadmap,roadmap)
      const res = await fetch(import.meta.env.VITE_BACKEND+"/api/roadmaps/"+roadmap._id,{
        method : "PUT",
                  headers: {
                      'Authorization': `Bearer ${token}`, 
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(
                    updated_roadmap 
                  )
      })
      if(!res.ok)
      {
        navigate("/error",{state:{error:{status:res.status, message:res.message||"Server Error."}}})
      }
      else{
        let data = await res.json();
        updated_roadmap = data.updated_roadmap
        console.log("Roadmap updated:",updated_roadmap)
        props.setRoadmaps(roadmaps => {
          let index = roadmaps.findIndex(r => r._id == updated_roadmap._id)
          let new_roadmaps = [...roadmaps]
          new_roadmaps[index] = updated_roadmap
          console.log(new_roadmaps)
          return new_roadmaps
        })
      }
    }
  },[])

  useEffect(() => {
    setProgress(((columns.find((col) => col.id == "completed").cards.length / noOfResources) * 100) || 0)
    // console.log(columns)
  }, [columns])
  
  useEffect(() => {
    if (progress == 100) {
      const duration = 5 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10 }

      const randomInRange = (min, max) => Math.random() * (max - min) + min

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      }, 250)
    }
  }, [progress])

  const Card = ({ id, title }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: id,
    })

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    }

    return (
      <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="bg-white p-2 text-lg rounded-md">
        <div id={id}>
          <p>{title}</p>
        </div>
      </div>
    )
  }

  const Column = ({ id, title, cards }) => {
    const { setNodeRef } = useDroppable({ id: id })
    // Create a new array with ids that dnd-kit can use
    const itemIds = cards.map((card) => card?._id)

    return (
      <SortableContext id={id} items={itemIds} strategy={rectSortingStrategy}>
        <div
          ref={setNodeRef}
          className="flex flex-col w-full overflow-x-hidden gap-2 p-2 h-[80%] overflow-y-auto custom-scrollbar"
        >
          {cards.map((card) => (card != null ? <Card key={card._id} id={card._id} title={card.title}></Card> : null))}
        </div>
      </SortableContext>
    )
  }

  const findColumn = (unique) => {
    if (!unique) {
      return null
    }
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null
    }
    const id = String(unique)
    const itemWithColumnId = columns.flatMap((c) => {
      const columnId = c.id
      c.cards = c.cards.filter((i) => i != null)
      return c.cards.map((i) => ({ itemId: String(i._id), columnId: columnId }))
    })
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId
    return columns.find((c) => c.id === columnId) ?? null
  }

  const handleDragOver = (event) => {
    const { active, over, delta } = event
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null
    console.log(overId, activeId)
    const activeColumn = findColumn(activeId)
    const overColumn = findColumn(overId)
    console.log(overColumn, activeColumn)
    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return null
    }
    setColumns((prevState) => {
      const activeItems = activeColumn.cards
      const overItems = overColumn.cards
      const activeIndex = activeItems.findIndex((i) => i._id === activeId)
      const overIndex = overItems.findIndex((i) => i._id === overId)
      const newIndex = () => {
        const putOnBelowLastItem = overIndex === overItems.length - 1 && delta.y > 0
        const modifier = putOnBelowLastItem ? 1 : 0
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1
      }
      return prevState.map((c) => {
        if (c.id === activeColumn.id) {
          c.cards = activeItems.filter((i) => i._id !== activeId)
          return c
        } else if (c.id === overColumn.id) {
          c.cards = [
            ...overItems.slice(0, newIndex()),
            activeItems[activeIndex],
            ...overItems.slice(newIndex(), overItems.length),
          ]
          return c
        } else {
          return c
        }
      })
    })
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    const activeId = String(active.id)
    const overId = over ? String(over.id) : null
    const activeColumn = findColumn(activeId)
    const overColumn = findColumn(overId)
    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      return null
    }
    const activeIndex = activeColumn.cards.findIndex((i) => i._id === activeId)
    const overIndex = overColumn.cards.findIndex((i) => i._id === overId)
    if (activeIndex !== overIndex) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex)
            return column
          } else {
            return column
          }
        })
      })
    }
  }

  return (
    <div className="h-full w-full ml-10 mb-4">
      <h1 className="text-center font-display text-4xl my-4 py-4 border-b-2">{roadmap.title}</h1>
      <div className="flex flex-row h-[55vh]">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          {columns.map((column) => (
            <div key={column.id} className="px-2 flex-1 border-x-2">
              <h1 className="text-center text-lg shadow-lg py-2 border-b-2 border-b-black">{column.title}</h1>

              <Column key={column.id} id={column.id} title={column.title} cards={column.cards}></Column>
            </div>
          ))}
        </DndContext>
      </div>
      <div>
        <h1 className="text-center font-semibold text-4xl mt-4 pt-4">Your Progress</h1>
        <h1 className="text-center font-semibold text-xl mb-4 py-4 border-b-2">{progress.toFixed(2)}%</h1>
        <Progress value={progress}></Progress>
      </div>
    </div>
  )
}

export default Roadmap