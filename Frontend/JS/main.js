function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateQueues(q1, q2, q3, MLFQ_div) {
  for (const [i, queue] of [q1, q2, q3].entries()) {
    const queue_div = document.createElement("div");
    queue_div.className = "queue";

    const queue_title = document.createElement("div");
    queue_title.className = "queue-title";

    if (queue.rr === undefined)
      queue_title.textContent = `Queue ${i + 1} (Quantum: ${queue.quantum})`;
    else
      queue_title.textContent = `Queue ${i + 1} (Quantum: ${
        queue.quantum
      }) - RR: ${queue.rr}`;

    queue_div.appendChild(queue_title);

    MLFQ_div.appendChild(queue_div);
    await delay(700);

    for (const proc of queue.processes) {
      const process_div = document.createElement("div");
      process_div.className = "process";
      process_div.innerHTML = `${proc.name} - <span>${proc.burst_time}ms</span>`;
      queue_div.appendChild(process_div);
      await delay(800);
    }
  }
}

async function generateContainer(quantum_index, q1, q2, q3, main_queue) {
  const container = document.createElement("div");
  container.className = "container";

  const title = document.createElement("div");
  title.className = "container-title";
  title.textContent = `Quantum ${quantum_index} - 100ms`;
  container.appendChild(title);

  const MLFQ_div = document.createElement("div");
  MLFQ_div.className = "MLFQ";
  container.appendChild(MLFQ_div);

  main_queue.appendChild(container);

  const q1_tmp = JSON.parse(JSON.stringify(q1));
  q2.addProcesses(q1.runScheduling());

  const q2_tmp = JSON.parse(JSON.stringify(q2));
  q3.addProcesses(q2.runScheduling());

  const q3_tmp = JSON.parse(JSON.stringify(q3));
  q1.addProcesses(q3.runScheduling());

  await generateQueues(q1_tmp, q2_tmp, q3_tmp, MLFQ_div);
}

class Process {
  constructor(name, burst_time) {
    this.name = name;
    this.burst_time = burst_time;
  }
}

class RRQueue {
  constructor(quantum, rr) {
    this.quantum = quantum;
    this.rr = rr;
    this.processes = [];
  }

  addProcesses(processes) {
    processes.forEach((p) => this.processes.push(p));
  }

  runScheduling() {
    const tmp_processes = [];
    let remaining_quantum = this.quantum;

    while (this.processes.length > 0) {
      const process = this.processes[0];
      const time_used = Math.min(
        remaining_quantum,
        this.rr,
        process.burst_time
      );
      process.burst_time -= time_used;

      if (process.burst_time > 0) tmp_processes.push(process);

      this.processes.splice(0, 1);
      remaining_quantum -= time_used;

      if (remaining_quantum <= 0) break;
    }
    return tmp_processes;
  }
}

class FCFSQueue {
  constructor(quantum) {
    this.quantum = quantum;
    this.processes = [];
  }

  addProcess(process) {
    this.processes.push(process);
  }

  addProcesses(processes) {
    processes.forEach((p) => this.processes.push(p));
  }

  runScheduling() {
    const tmp_processes = [];
    let remaining_quantum = this.quantum;

    while (this.processes.length > 0) {
      const process = this.processes[0];
      const time_used = Math.min(remaining_quantum, process.burst_time);
      process.burst_time -= time_used;

      if (process.burst_time > 0) tmp_processes.push(process);

      this.processes.splice(0, 1);
      remaining_quantum -= time_used;

      if (remaining_quantum <= 0) break;
    }
    return tmp_processes;
  }
}

class MainQueue {
  constructor() {
    this.sub_queues = [];
    this.quantum = 100;
  }

  addSubQueue(queue) {
    this.sub_queues.push(queue);
  }

  async runScheduling() {
    const [q1, q2, q3] = this.sub_queues;
    const main_queue = document.getElementById("main");

    let quantum_index = 1;

    while (
      q1.processes.length > 0 ||
      q2.processes.length > 0 ||
      q3.processes.length > 0
    ) {
      await generateContainer(quantum_index, q1, q2, q3, main_queue);
      quantum_index++;
    }
  }
}

// ------------------------------
// Start simulation
/*(async () => {
    const p1 = new Process('P1', 120);
    const p2 = new Process('P2', 100);
    const p3 = new Process('P3', 50);
  
    const queue1 = new RRQueue(40, 8);
    const queue2 = new RRQueue(40, 16);
    const queue3 = new FCFSQueue(20);
  
    queue1.addProcesses([p1, p2, p3]);
  
    const main_queue = new MainQueue();
    main_queue.addSubQueue(queue1);
    main_queue.addSubQueue(queue2);
    main_queue.addSubQueue(queue3);
  
    await main_queue.runScheduling();
  })();
  */

let inputProcesses = [];
let deleteMode = false;
let selectedIndexes = new Set();

function updateProcessList() {
  const list = document.getElementById("processList");
  list.innerHTML = "";

  inputProcesses.forEach((p, index) => {
    const li = document.createElement("li");

    if (deleteMode) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = selectedIndexes.has(index);
      checkbox.style.marginRight = "10px";
      checkbox.onclick = () => {
        if (checkbox.checked) {
          selectedIndexes.add(index);
        } else {
          selectedIndexes.delete(index);
        }
      };
      li.appendChild(checkbox);
    }

    const text = document.createElement("span");
    text.innerHTML = `<strong>${p.name}</strong>: ${p.burst_time}ms`;
    li.appendChild(text);

    // Nút Edit bên phải tiến trình
    const editBtn = document.createElement("button");
    editBtn.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      document.getElementById("processName").value = p.name;
      document.getElementById("burstTime").value = p.burst_time;
      inputProcesses.splice(index, 1);
      updateProcessList();
      document.getElementById("processName").focus();
    };
    li.appendChild(editBtn);

    list.appendChild(li);
  });

  // Ẩn/hiện nút Apply Delete
  const applyBtn = document.getElementById("applyDeleteBtn");
  applyBtn.style.display = deleteMode ? "inline-block" : "none";
}

function toggleDeleteMode() {
  if (inputProcesses.length === 0) {
    alert("Queue is empty. Nothing to delete.");
    return;
  }

  deleteMode = !deleteMode;
  editMode = false;
  selectedIndexes.clear();
  updateProcessList();
}

if (deleteMode && selectedIndexes.size > 0) {
  handleBulkDelete();
}

function applyDeleteChanges() {
  if (selectedIndexes.size === 0) {
    alert("Please select at least one process to delete.");
    return;
  }

  if (!confirm("Are you sure you want to delete selected processes?")) return;

  inputProcesses = inputProcesses.filter((_, i) => !selectedIndexes.has(i));
  selectedIndexes.clear();
  deleteMode = false;
  updateProcessList();
}

function addProcess() {
  const name = document.getElementById("processName").value.trim();
  const burstTime = parseInt(document.getElementById("burstTime").value);

  //  kiểm tra tên tiến trình: chỉ chấp nhận ký tự chữ + số, tối đa 6 ký tự
  const nameRegex = /^[A-Za-z][A-Za-z0-9]{0,5}$/;
  if (!nameRegex.test(name)) {
    alert(
      "Process name must start with a letter and be alphanumeric (max 6 characters)."
    );
    return;
  }

  //  kiểm tra burst time
  if (isNaN(burstTime) || burstTime <= 0 || burstTime > 400) {
    alert("Burst time must be a number between 1 and 400.");
    return;
  }

  //  giới hạn tối đa 4 tiến trình
  if (inputProcesses.length >= 4) {
    alert("Only up to 4 processes are allowed.");
    return;
  }

  //  không trùng tên
  const isDuplicate = inputProcesses.some(
    (proc) => proc.name.toLowerCase() === name.toLowerCase()
  );
  if (isDuplicate) {
    alert("Process name must be unique.");
    return;
  }

  //  hợp lệ → thêm tiến trình
  inputProcesses.push(new Process(name, burstTime));
  updateProcessList();

  // Reset input
  document.getElementById("processName").value = "";
  document.getElementById("burstTime").value = "";
  document.getElementById("processName").focus();
}
//-------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("processName");
  const burstInput = document.getElementById("burstTime");

  nameInput.focus();

  nameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && nameInput.value.trim() !== "") {
      burstInput.focus();
    }
  });

  burstInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); //  Ngăn Enter gây tác dụng phụ sau alert()

      const name = nameInput.value.trim();
      const burst = burstInput.value.trim();

      if (!name || !burst) {
        alert("Please enter both process name and burst time.");
        return;
      }

      addProcess();
      nameInput.focus();
      nameInput.select();
    }
  });
});

// Cho phép ấn Enter để thêm tiến trình và chuyển focus hợp lý
document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("processName");
  const burstInput = document.getElementById("burstTime");

  // Khi vừa vào trang, focus vào ô nhập tên tiến trình
  nameInput.focus();

  // Enter trong ô "Process Name" → chuyển sang "Burst Time"
  nameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      if (nameInput.value.trim() !== "") {
        burstInput.focus();
      }
    }
  });

  // Enter trong ô "Burst Time" → thêm tiến trình
  burstInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      if (burstInput.value.trim() !== "") {
        addProcess();
        nameInput.focus(); // Sau khi thêm, quay lại nhập tên mới
        nameInput.select(); // Bôi đen sẵn để nhập cái mới luôn
      }
    }
  });
});
/* Tinh gọn đoạn trên
document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("processName");
  const burstInput = document.getElementById("burstTime");

  nameInput.focus();

  // Enter trong ô "Process Name" → chuyển sang "Burst Time"
  nameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && nameInput.value.trim() !== "") {
      burstInput.focus();
    }
  });

  // Enter trong ô "Burst Time" → thêm tiến trình
  burstInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Chặn enter gây submit ngầm

      const name = nameInput.value.trim();
      const burst = burstInput.value.trim();

      if (!name || !burst) {
        alert("Please enter both process name and burst time.");
        return;
      }

      addProcess();
      nameInput.focus();
      nameInput.select();
    }
  });
});
*/
//--------------------------------------------------------------------------------------------------------------------

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
