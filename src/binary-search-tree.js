const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this._rootNode = null;
  }

  root() {
    return this._rootNode;
  }

  add(data) {
    if (this.has(data)) {
      return ;
    } 
    if (!this.root()) {
      this._rootNode = new Node(data);
      return ;
    }

    let currentNode = this.root();
    while (true) {
      if (currentNode.data > data) {
        if (currentNode.leftChild) {
          currentNode = currentNode.leftChild;
        } else {
          currentNode.leftChild = new Node(data);
          break;
        }
      } else if (currentNode.data < data) {
        if (currentNode.rightChild) {
          currentNode = currentNode.rightChild;
        } else {
          currentNode.rightChild = new Node(data);
          break;
        }
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    return this._findNode(this.root(), data);
  }

  _findNode(startNode, data) {
    if (!startNode) {
      return null;
    } else if (startNode.data === data) {
      return startNode;
    } else if (startNode.data > data && startNode.leftChild) {
      return this._findNode(startNode.leftChild, data);
    } else if (startNode.data < data && startNode.rightChild) {
      return this._findNode(startNode.rightChild, data);
    }
    return null;
  }

  _findParent(startNode, data) {
    if (!startNode || startNode.data === data) {
      return null;
    } else if (startNode.data > data && startNode.leftChild) {
      return startNode.leftChild.data === data ? startNode : this._findParent(startNode.leftChild, data);
    } else if (startNode.data < data && startNode.rightChild) {
      return startNode.rightChild.data === data ? startNode : this._findParent(startNode.rightChild, data);
    } 
    return null;
  }

  _removeNodeWithoutChildren(node) {
    if (node === this.root()) {
      this._rootNode = null;
      return ;
    }
    const parentNode = this._findParent(this.root(), node.data);
    if (parentNode.leftChild === node) {
      parentNode.leftChild = null;
    } else {
      parentNode.rightChild = null;
    }
  }

  _removeNodeWithOnlyOneChild(node) {
    const childNode = node.leftChild || node.rightChild;
    if (node === this.root()) {
      this._rootNode = childNode;
      return ;
    }
    const parentNode = this._findParent(this.root(), node.data);
    if (parentNode.leftChild === node) {
      parentNode.leftChild = childNode;
    } else {
      parentNode.rightChild = childNode;
    }
    node.leftChild = null;
    node.rightChild = null;
  }

  _removeNodeWithTwoChildren(node) {
    const minNodeInRightSubtree = this.find(this.min(node.rightChild));
    this.remove(minNodeInRightSubtree.data);
    minNodeInRightSubtree.leftChild = node.leftChild;
    minNodeInRightSubtree.rightChild = node.rightChild;

    if (node === this.root()) {
      this._rootNode = minNodeInRightSubtree;
      return ;
    }
    const parentNode = this._findParent(this.root(), node.data);
    if (parentNode.leftChild === node) {
      parentNode.leftChild = minNodeInRightSubtree;
    } else {
      parentNode.rightChild = minNodeInRightSubtree;
    }
    node.leftChild = null;
    node.rightChild = null;
  }

  remove(data) {
    const foundNode = this.find(data);
    if (!foundNode) {
      return ;
    }
    if (!foundNode.leftChild && !foundNode.rightChild) {
      this._removeNodeWithoutChildren(foundNode);
    } else if (foundNode.leftChild && foundNode.rightChild) {
      this._removeNodeWithTwoChildren(foundNode);
    } else {
      this._removeNodeWithOnlyOneChild(foundNode);
    }
  }

  min(startNode) {
    let currentNode = startNode || this.root();
    if (!currentNode || !this.find(currentNode.data)) {
      return null;
    }
    while (currentNode.leftChild) {
      currentNode = currentNode.leftChild;
    }
    return currentNode.data;
  }

  max(startNode) {
    let currentNode = startNode || this.root();
    if (!currentNode || !this.find(currentNode.data)) {
      return null;
    }
    while (currentNode.rightChild) {
      currentNode = currentNode.rightChild;
    }
    return currentNode.data;
  }
}


module.exports = {
  BinarySearchTree
};
