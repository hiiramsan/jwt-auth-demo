import { useParams } from "react-router-dom"
import { useProject } from "../hooks/useProject";
import { useTasks } from "../hooks/useTasks";

const ProjectPage = () => {

  const { projectId } = useParams();

  const id = Number(projectId);
  const validId = Number.isNaN(id) ? null : id;

  const { project, loading: projectLoading, error: projectError } = useProject(validId)

  const {tasks, loading: tasksLoading, error: tasksError} = useTasks(validId);

  if(projectLoading) return  <p>Loading...</p>
  if(projectError) return <p>Failed to fetch project</p>
  if(!project) return <p>Project not found lol</p>
  if (tasksLoading) return <p>Loading tasks...</p>;
  if (tasksError) return <p>Failed to fetch tasks</p>;

  console.log(tasks)

  return (
    <main className="todo-page">
      <h1>{project.name}</h1>
      <div className="todo-list">
        {tasks.map(task => (
          <article className="todo-item" key={task.id}>
            <div className="todo-item__content">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <div className="todo-item__details">
              <p>Due: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <span className="todo-status">{task.status}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default ProjectPage