"use client";

import { useState } from "react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-8 p-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Convex + Clerk</h1>
        <Authenticated>
          <UserButton />
        </Authenticated>
      </header>

      <Unauthenticated>
        <div className="flex flex-col items-start gap-4">
          <p className="text-sm text-neutral-500">
            Sign in to see your tasks, stored in Convex and scoped to your
            Clerk user.
          </p>
          <div className="flex gap-2">
            <SignInButton>
              <button className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium dark:border-neutral-700">
                Sign up
              </button>
            </SignUpButton>
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <Tasks />
      </Authenticated>
    </main>
  );
}

function Tasks() {
  const tasks = useQuery(api.tasks.list);
  const addTask = useMutation(api.tasks.add);
  const toggleTask = useMutation(api.tasks.toggle);
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = text.trim();
          if (!trimmed) return;
          void addTask({ text: trimmed });
          setText("");
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task..."
          className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
        />
        <button
          type="submit"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          Add
        </button>
      </form>

      {tasks === undefined ? (
        <p className="text-sm text-neutral-500">Loading…</p>
      ) : tasks.length === 0 ? (
        <p className="text-sm text-neutral-500">No tasks yet. Add one above.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <li key={task._id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => void toggleTask({ id: task._id })}
                />
                <span className={task.isCompleted ? "line-through opacity-50" : ""}>
                  {task.text}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
