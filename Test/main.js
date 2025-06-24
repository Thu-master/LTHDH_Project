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
  const p1 = new Process("P1", 120);
  const p2 = new Process("P2", 100);
  const p3 = new Process("P3", 50);

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
