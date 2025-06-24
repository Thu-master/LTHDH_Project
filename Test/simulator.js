const inputProcesses = [];

function updateProcessList() {
  const list = document.getElementById("processList");
  list.innerHTML = "";
  inputProcesses.forEach((p, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${p.name}</strong>: ${p.burst_time}ms`;
    list.appendChild(li);
  });
}

function addProcess() {
  const name = document.getElementById("processName").value.trim();
  const burstTime = parseInt(document.getElementById("burstTime").value);

  if (!name || isNaN(burstTime) || burstTime <= 0) {
    alert("Please enter valid process name and burst time.");
    return;
  }

  inputProcesses.push(new Process(name, burstTime));
  updateProcessList();

  document.getElementById("processName").value = "";
  document.getElementById("burstTime").value = "";
}

// Cho phép ấn Enter để thêm tiến trình
document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("processName");
  const burstInput = document.getElementById("burstTime");

  // Lắng nghe sự kiện Enter trong 2 ô input
  [nameInput, burstInput].forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addProcess();
      }
    });
  });
});

async function startSimulation() {
  if (inputProcesses.length === 0) {
    alert("Please add at least one process before starting the simulation.");
    return;
  }

  const mainDiv = document.getElementById("main");
  mainDiv.innerHTML = "";

  const queue1 = new RRQueue(40, 8);
  const queue2 = new RRQueue(40, 16);
  const queue3 = new FCFSQueue(20);

  const userProcesses = inputProcesses.map(
    (p) => new Process(p.name, p.burst_time)
  );
  queue1.addProcesses(userProcesses);

  const main_queue = new MainQueue();
  main_queue.addSubQueue(queue1);
  main_queue.addSubQueue(queue2);
  main_queue.addSubQueue(queue3);

  await main_queue.runScheduling();
}
