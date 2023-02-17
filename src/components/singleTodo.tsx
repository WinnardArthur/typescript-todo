import { Todo } from "./model";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';
import { useEffect, useRef, useState } from "react";
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    todo: Todo,
    todos: Todo[],
    index: number,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function SingleTodo ({ index, todo, todos, setTodos }: Props) {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const inputRef = useRef<HTMLInputElement>(null)

    const handleDone = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo))
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map((todo) => todo.id === id ? {...todo, todo: editTodo} : todo))
        setEdit(false);
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided,snapshot) => (
                    <form 
                        className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} 
                        onSubmit={(e) => handleEdit(e, todo.id)} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {
                            edit ? (
                                <input value={editTodo} ref={inputRef} onChange={(e) => setEditTodo(e.target.value)} className='todos__single-text'/>
                            ) : (
                                todo.isDone ? (
                                    <s className="todos__single-text">{todo.todo}</s>
                                ) : (
                                    <span className="todos__single-text">{todo.todo}</span>
                                )
                            )
                        }
                        <div>
                            <span className="icon" onClick={() => {
                                if(!edit && !todo.isDone) {
                                    setEdit(!edit)
                                }
                            }
                            }>
                                <AiFillEdit/>
                            </span>
                            <span className="icon">
                                <AiFillDelete onClick={() => handleDelete(todo.id)}/>
                            </span>
                            <span className="icon">
                                <MdDone onClick={() => handleDone(todo.id)}/>
                            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
  )
}
