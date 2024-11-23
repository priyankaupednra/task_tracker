import React, { useState } from "react";

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  // Start editing a task
  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditFormData(task);
  };

  // Handle form changes during editing
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Save the edited task
  const handleSaveClick = () => {
    onUpdateTask(editFormData);
    setEditingTaskId(null);
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                {editingTaskId === task.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleFormChange}
                      />
                    </td>
                    <td>
                      <textarea
                        name="description"
                        value={editFormData.description}
                        onChange={handleFormChange}
                      ></textarea>
                    </td>
                    <td>
                      <input
                        type="date"
                        name="dueDate"
                        value={editFormData.dueDate}
                        onChange={handleFormChange}
                      />
                    </td>
                    <td>
                      <select
                        name="status"
                        value={editFormData.status}
                        onChange={handleFormChange}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={handleSaveClick}>Save</button>
                      <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.status}</td>
                    <td>
                      <button onClick={() => handleEditClick(task)}>Edit</button>
                      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
