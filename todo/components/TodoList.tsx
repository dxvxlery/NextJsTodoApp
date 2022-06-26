import s from "../styles/TodoList.module.css"
import EditButton from "../assets/editButton.png";
import DeleteButton from "../assets/deleteButton.png";
import ComletedButton from "../assets/completed.png";
import Image from 'next/image'
import { ITodos } from "../types/ITodo";

type ITotoItem = {
    todo: ITodos,
    deleteTodo: (id: string) => void,
    changeTodo: (id: string) => void,
    completedTodo: (id: string) => void,
    update: boolean
    todoNumber: number
}
const TodoList = ({ todo, deleteTodo, changeTodo, completedTodo, update }: ITotoItem) => {
    return (
        <div className={s.container}>
            <input type="checkbox" className={s.changeCompleted} onChange={() => completedTodo(todo.id)} />
            <p className={todo.completed ? (s.todoNameCompleted) : (s.todoName)}>{todo.todo}</p>
            <div className={s.buttons}>
                <button disabled={update} className={s.changeImage} onClick={() => changeTodo(todo.id)}>
                    <Image
                        src={EditButton}
                        alt="change"
                        width={20}
                        height={20}
                        layout="fixed"
                    />
                </button>
                <button disabled={update} className={s.deleteImage} onClick={() => deleteTodo(todo.id)}>
                    <Image
                        src={DeleteButton}
                        alt="delete"
                        width={20}
                        height={20}
                        layout="fixed"
                    />
                </button>
            </div>
        </div>
    );
};

export default TodoList;
