import type { NextPage } from 'next'
import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
import s from '../styles/Home.module.css'
import TodoList from "../components/TodoList";
import { ITodos } from '../types/ITodo';
import NoItems from '../assets/magnifier.svg'
import Image from 'next/image'

const Home: NextPage = () => {
    const [todos, setTodos] = useState<ITodos[]>([{
        id: "1", todo: "Clean my room.", completed: false
    }, {
        id: "2", todo: "Dont forget about homework.", completed: false
    }]);
    const [input, setInput] = useState('');
    const [update, setUpdate] = useState(false);
    const [updateid, setUpdateid] = useState('');
    const addTodo = () => {
        if (input) {
            setTodos([...todos, {
                id: uuidv4(),
                todo: input,
                completed: false
            }]);
            setInput('');
        }
    }
    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
        setUpdate(false);
    }

    const changeTodo = (id: string) => {
        setInput(todos.filter(todo => todo.id === id)[0].todo)
        setUpdateid(id);
        setUpdate(true)
    }

    const updateTodo = () => {
        setTodos(todos.map(todo => {
            if (todo.id !== updateid) return todo;
            return {
                ...todo,
                todo: input
            }
        }))
        setInput('');
        setUpdate(false);
        
    }
    const completedTodo = (id: string) => {
        setTodos(todos.map(todo => {
            if (todo.id !== id) return todo;
            return {
                ...todo,
                completed: !todo.completed
            }
        }))
    }
    return (
        <div className={s.container}>
            <Head>
                <title>Todos</title>
                <meta name="description" content="My todos list" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={s.wrapper}>
                <div className={s.inner}>
                    <h1>Todos</h1>
                    <div className={s.topTodoBar}>
                        <input className={s.todoInput} value={input} onChange={(e) => setInput(e.target.value)}
                            type="text" placeholder="Add new todo" />
                        {
                            update ? (
                                <button className={s.addButton} onClick={() => updateTodo()}>Change todo</button>) : (
                                <button className={s.addButton} onClick={() => addTodo()}>Add new todo</button>
                            )
                        }
                    </div>
                    <hr />
                    {
                        todos.length === 0 && (
                            <div className={s.emptyList}>
                                <Image
                                    src={NoItems}
                                    alt="change"
                                    width={150}
                                    height={150}
                                    className={s.magnifier}
                                />
                                <h1>Your todo list is empty.</h1>
                            </div>

                        )
                    }
                    {todos.map((todo, index) => (
                        <div className={s.todoItem} key={todo.id}>
                            <TodoList todo={todo} todoNumber={index} completedTodo={completedTodo}
                                deleteTodo={deleteTodo} changeTodo={changeTodo} update={update} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home

