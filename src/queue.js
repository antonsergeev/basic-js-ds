const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {

  constructor() {
    this._head = null;
  }

  getUnderlyingList() {
    return this._head;
  }

  enqueue(value) {
    if (!this._head) {
      this._head = new ListNode(value);
      return ;
    }
    let currentNode = this._head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = new ListNode(value);
  }

  dequeue() {
    const headNode = this._head;
    this._head = headNode.next;
    return headNode.value;
  }
}

module.exports = {
  Queue
};
