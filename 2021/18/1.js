const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath).toString();

const rows = input.split('\n').map(JSON.parse);

class Node {
    value;
    left;
    right;
    parent;
    isTop;
    nestLevel;
    constructor(parent, children, nestLevel) {
        this.parent = parent;
        this.isTop = !parent;
        this.nestLevel = nestLevel;
        if (children == undefined) {
            return;
        }

        if (!Array.isArray(children)) {
            this.value = children;
        } else {
            this.left = new Node(this, children[0], nestLevel + 1);
            this.right = new Node(this, children[1], nestLevel + 1);
        }
    }

    sum() {
        if (this.value != undefined) {
            return this.value;
        }

        return this.left.sum() * 3 + this.right.sum() * 2;
    }

    addParent(parent) {
        if (parent) {
            this.parent = parent;
            this.isTop = false;
        }
        this.nestLevel++;

        if (this.left) {
            this.left.addParent();
        }

        if (this.right) {
            this.right.addParent();
        }
    }

    reduce() {
        while (true) {
            const nextToExplode = this.getNextToExplode()
            if (nextToExplode) {
                nextToExplode.explode();
                continue;
            }

            const nextToSplit = this.getNextToSplit();
            if (nextToSplit) {
                nextToSplit.split();
                continue;
            }

            break;
        }
    }

    getNextToExplode() {
        if (this.value !== undefined) {
            return undefined;
        }

        if (this.nestLevel > 4) {
            return this;
        }

        return this.left.getNextToExplode() || this.right.getNextToExplode();
    }

    explode() {
        const nearestLeft = this.getNearestLeft();

        if (nearestLeft) {
            nearestLeft.value = nearestLeft.value ? nearestLeft.value + this.left.value : this.left.value;
        }

        const nearestRight = this.getNearestRight();

        if (nearestRight) {
            nearestRight.value = nearestRight.value ? nearestRight.value + this.right.value : this.right.value;
        }

        this.left = undefined;
        this.right = undefined;
        this.value = 0;
    }

    rightMost() {
        if (this.value != undefined) {
            return this;
        }

        return this.right.rightMost();
    }

    leftMost() {
        if (this.value != undefined) {
            return this;
        }

        return this.left.leftMost();
    }

    getNearestLeft() {
        if (!this.parent) {
            return undefined;
        }

        if (this.parent.left !== this) {
            return this.parent.left.rightMost();
        }

        return this.parent.getNearestLeft();
    }

    getNearestRight() {
        if (!this.parent) {
            return undefined;
        }

        if (this.parent.right !== this) {
            return this.parent.right.leftMost();
        }

        return this.parent.getNearestRight();
    }

    getNextToSplit() {
        if (this.value !== undefined) {
            if (this.value >= 10) {
                return this;
            }

            return undefined;
        }

        return this.left.getNextToSplit() || this.right.getNextToSplit();
    }

    split() {
        this.left = new Node(this, Math.floor(this.value / 2), this.nestLevel + 1);
        this.right = new Node(this, Math.round(this.value / 2), this.nestLevel + 1);
        this.value = undefined;
    }

    toString() {
        if (this.value !== undefined) {
            return this.value;
        }

        return `[${this.left.toString()}, ${this.right.toString()}]`
    }
}

const reduced = rows.reduce((node, row) => {
    if (!node) {
        node = new Node(null, row, 1);
        return node;
    }
    const newNode = new Node(null, row, 1);

    const newTopNode = new Node(null, null, 1);
    newTopNode.left = node;
    node.isLeftChild = true;
    newTopNode.right = newNode;

    newNode.addParent(newTopNode);
    node.addParent(newTopNode);

    newTopNode.reduce();
    return newTopNode;
}, null);

console.log(reduced.sum());