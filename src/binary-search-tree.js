const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  _root = null;
  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(data);//{data = data, left = null, right = null}
    if (!this._root) {
      this._root = node;
      return;
    }

    let currentNode = this._root;

    while (currentNode) {
      if (node.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = node;
          return;
        }

        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = node;
          return;
        }

        currentNode = currentNode.right;
      }
    }


  }

  has(data) {
    const queue = [this._root];
    while (queue.length) {
      const node = queue.shift();
      if (node.data === data) {
        return true;
      } else {
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }
    }
    return false;
  }

  find(data) {
    const queue = [this._root];
    while (queue.length) {
      const node = queue.shift();
      if (node.data === data) {
        return node;
      } else {
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }
    }
    return null;
  }

  _removeRec(node, data) {
    if (!node) {
      return node;
    }
    if (data < node.data) {
      node.left = this._removeRec(node.left, data);
    } else if (data > node.data) {
      node.right = this._removeRec(node.right, data);
    }
    else { //data === node.data
      if (node.left == null)//если один ребенок/нет детей
        return node.right;
      else if (node.right == null)//если один ребенок/нет детей
        return node.left;

      node.data = this._minInBranch(node.right); //присваиваем текущему узлу минимальное значение найденного узла в правом поддереве

      node.right = this._removeRec(node.right, node.data) //удаляем минимальный найденный 
    }
    return node;
  }

  _minInBranch(node) {
    const queue = [node];
    let min = node.data;
    if (!queue.length) {
      return null;
    }
    while (queue.length) {
      const node = queue.shift();
      if (node.data < min) {
        min = node.data;
      }
      if (node.left) {
        queue.push(node.left);
      }
    }
    return min;
  }

  remove(data) {
    this._removeRec(this._root, data);
  }



  min() {
    return this._minInBranch(this._root);
  }


  max() {
    const queue = [this._root];
    let max = this._root.data;
    if (!queue.length) {
      return null;
    }
    while (queue.length) {
      const node = queue.shift();
      if (node.data > max) {
        max = node.data;
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return max;
  }
}


module.exports = {
  BinarySearchTree
};