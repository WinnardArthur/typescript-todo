import './styles.css';
import { useRef } from 'react';

interface Props {
    todo:string;
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e: React.FormEvent) => void;
    
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
  
    return (
    <form className='input' onSubmit={(e) => {
        handleAdd(e)
        inputRef.current?.blur()
    }}>
        <input 
            ref={inputRef}
            type="input" 
            placeholder='Enter a Task' 
            className='input__box'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
        />
        <button className='input__submit' type='submit'>Go</button>
    
    </form>
  )
}

export default InputField