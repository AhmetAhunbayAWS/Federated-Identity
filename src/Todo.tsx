import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { signOut } from "aws-amplify/auth";

const client = generateClient<Schema>();

const Todo = () => {

    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

    useEffect(() => {
        client.models.Todo.observeQuery().subscribe({
        next: (data) => setTodos([...data.items]),
        });
    }, []);

    function createTodo() {
        console.log("todo call")
        client.models.Todo.create({ content: window.prompt("Todo content") });
    }

    function deleteTodo(id: string){
        client.models.Todo.delete({ id })
    }

    return(
        <main>
            <h1>Welcome!</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
            {todos.filter(todo => todo.content !== "").map((todo) => (<li
                onClick={() => deleteTodo(todo.id)}
                key={todo.id}>
                {todo.content}
            </li>
            ))}
            </ul>
            <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
                Review next step of this tutorial.
            </a>
            </div>
            <button onClick={() => {signOut()}}>Sign out</button>
        </main>
    )
}

export default Todo
    
