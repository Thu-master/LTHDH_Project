class Process {
    constructor(name, burst_time) {
        this.name = name
        this.burst_time = burst_time
    }
}

class RRQueue {
    constructor(quantum, rr) {
      this.quantum = quantum;
      this.rr = rr;
      this.processes = []
    }

    addProcesses(processes) {
        processes.forEach(p => this.processes.push(p))     
    }

    runScheduling() {        
        const tmp_processes = [];
        let remaining_quantum = this.quantum;
      
        while (this.processes.length > 0) {
            
            var process = this.processes[0];

            const tmp = Math.min(remaining_quantum, this.rr, process.burst_time);

            process.burst_time -= tmp;

            if(process.burst_time > 0)
                tmp_processes.push(process);
                        
            this.processes.splice(0, 1);  
                        
            remaining_quantum -= tmp;
            if (remaining_quantum <= 0) break;
        }        
        return tmp_processes;
    }      
}

class FCFSQueue {
    constructor(quantum) {
      this.quantum = quantum;
      this.processes = []
    }

    addProcess(process) {
        this.processes.push(process)
    }

    addProcesses(processes) {
        processes.forEach(p => this.processes.push(p))
    }

    runScheduling() {
        const tmp_processes = [];
        let remaining_quantum = this.quantum;
      
        while (this.processes.length > 0) {
            
            var process = this.processes[0];

            const tmp = Math.min(remaining_quantum, process.burst_time);            
        
            process.burst_time -= tmp;
            
            if(process.burst_time > 0)
                tmp_processes.push(process);
            
            this.processes.splice(0, 1);  
                        
            remaining_quantum -= tmp;
            if (remaining_quantum <= 0) break;
        }        
        return tmp_processes;
    }
}

class MainQueue {
    constructor() {
      this.sub_queues = [];
      this.quantum = 100
    }
  
    addSubQueue(sub_queues) {
      this.sub_queues.push(sub_queues);
    }

    runScheduling() {
        var q1 = this.sub_queues[0]
        var q2 = this.sub_queues[1]
        var q3 = this.sub_queues[2]

        while (q1.processes.length != 0 || q2.processes.length != 0 || q3.processes.length != 0) {
            console.log('-----100ms----');
            
            console.log('Before: ')
            console.log('Q1:', JSON.parse(JSON.stringify(q1.processes)));
            
            q2.addProcesses(q1.runScheduling())
            console.log('After: ')
            console.log('Q1:', JSON.parse(JSON.stringify(q1.processes)));

            console.log('----------------');

            console.log('Before: ')
            console.log('Q2:', JSON.parse(JSON.stringify(q2.processes)));
            
            q3.addProcesses(q2.runScheduling())
            console.log('After: ')
            console.log('Q2:', JSON.parse(JSON.stringify(q2.processes)));

            console.log('----------------');

            console.log('Before: ')
            console.log('Q3:', JSON.parse(JSON.stringify(q3.processes)));

            q1.addProcesses(q3.runScheduling())
            console.log('After: ')
            console.log('Q3:', JSON.parse(JSON.stringify(q3.processes)));

        }  
        console.log('-----END----');
        console.log('Q1:', q1);
        console.log('Q2:', q2);
        console.log('Q3:', q3);
    }
}


//-------------------------------//
const p1 = new Process('P1', 120)
const p2 = new Process('P2', 100)
const p3 = new Process('P3', 50)

const processes = [p1,p2,p3]

const queue1 = new RRQueue(40, 8)

queue1.addProcesses(processes)

const queue2 = new RRQueue(40, 16)

const queue3 = new FCFSQueue(20)

const main_queue = new MainQueue()

main_queue.addSubQueue(queue1)
main_queue.addSubQueue(queue2)
main_queue.addSubQueue(queue3)

main_queue.runScheduling()

