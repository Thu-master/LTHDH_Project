let processes = [];
let time = 0;

function addProcess() {
  const name = document.getElementById("processName").value;
  const arrival = parseInt(document.getElementById("arrivalTime").value);
  const burst = parseInt(document.getElementById("burstTime").value);
  
  if (!name || isNaN(arrival) || isNaN(burst)) {
    alert("Vui lòng điền đầy đủ thông tin tiến trình.");
    return;
  }

  processes.push({
    name,
    arrivalTime: arrival,
    burstTime: burst,
    remainingTime: burst,
    queueLevel: 0
  });

  log(`✅ Đã thêm tiến trình: ${name} | Arrival: ${arrival}, Burst: ${burst}`);
}

function startSimulation() {
  const queues = [[], [], []];
  const quantum = [4, 8];
  const completed = [];
  time = 0;

  // Clone processes để tránh thay đổi danh sách gốc
  let procList = JSON.parse(JSON.stringify(processes));

  const interval = setInterval(() => {
    // Đưa tiến trình đến đúng queue nếu đến đúng thời điểm
    procList.forEach(p => {
      if (p.arrivalTime === time) {
        queues[0].push(p);
        log(`🕓 Time ${time}: Tiến trình ${p.name} đến và vào Queue 0`);
        updateQueues(queues);
      }
    });

    // Xử lý tiến trình trong hàng đợi ưu tiên cao nhất có tiến trình
    for (let q = 0; q < queues.length; q++) {
      if (queues[q].length > 0) {
        let current = queues[q].shift();
        let qTime = q < 2 ? quantum[q] : current.remainingTime;
        let execTime = Math.min(qTime, current.remainingTime);

        log(`▶️ Đang chạy ${current.name} từ Queue ${q} trong ${execTime} đơn vị thời gian`);
        updateQueues(queues);
        
        setTimeout(() => {
          time += execTime;
          current.remainingTime -= execTime;

          if (current.remainingTime > 0) {
            current.queueLevel = Math.min(2, current.queueLevel + 1);
            queues[current.queueLevel].push(current);
            log(`🔁 ${current.name} chưa xong, chuyển xuống Queue ${current.queueLevel}`);
          } else {
            completed.push(current);
            log(`✅ ${current.name} hoàn tất tại thời điểm ${time}`);
          }

          updateQueues(queues);

          if (completed.length === processes.length) {
            log(`🎉 Tất cả tiến trình đã hoàn tất.`);
            clearInterval(interval);
          }

        }, 500); // Giả lập delay khi chạy tiến trình
        return;
      }
    }

    // Không có tiến trình nào trong queue
    time++;
  }, 600);
}

function updateQueues(queues) {
  for (let i = 0; i < queues.length; i++) {
    const queueDiv = document.getElementById(`queue${i}`);
    queueDiv.innerHTML = `<h3>Queue ${i} (${i === 0 ? "TQ:4" : i === 1 ? "TQ:8" : "FCFS"})</h3>`;
    queues[i].forEach(p => {
      const el = document.createElement("span");
      el.className = "process";
      el.innerText = p.name;
      queueDiv.appendChild(el);
    });
  }
}

function log(text) {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML += text + "<br>";
  logDiv.scrollTop = logDiv.scrollHeight;
}
