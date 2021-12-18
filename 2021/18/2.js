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
    nestLevel;
    constructor(parent, children, nestLevel) {
        this.parent = parent;
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
            const nextToExplode = this.getExplode()
            if (nextToExplode) {
                nextToExplode.explode();
                continue;
            }

            const nextToSplit = this.getSplit();
            if (nextToSplit) {
                nextToSplit.split();
                continue;
            }

            return;
        }
    }

    getExplode() {
        if (this.value !== undefined) {
            return undefined;
        }

        if (this.nestLevel > 4) {
            return this;
        }

        return this.left.getExplode() || this.right.getExplode();
    }

    explode() {
        const nearestLeft = this.getNearestLeftNode();
        if (nearestLeft) {
            nearestLeft.value += this.left.value;
        }

        const nearestRight = this.getNearestRightNode();
        if (nearestRight) {
            nearestRight.value += this.right.value;
        }

        this.left = undefined;
        this.right = undefined;
        this.value = 0;
    }

    rightMost() {
        return this.value != undefined ? this : this.right.rightMost();
    }

    leftMost() {
        return this.value != undefined ? this : this.left.leftMost();
    }

    getNearestLeftNode() {
        if (!this.parent) {
            return undefined;
        }

        if (this.parent.left !== this) {
            return this.parent.left.rightMost();
        }

        return this.parent.getNearestLeftNode();
    }

    getNearestRightNode() {
        if (!this.parent) {
            return undefined;
        }

        if (this.parent.right !== this) {
            return this.parent.right.leftMost();
        }

        return this.parent.getNearestRightNode();
    }

    getSplit() {
        if (this.value !== undefined) {
            return this.value >= 10 && this;
        }

        return this.left.getSplit() || this.right.getSplit();
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

const rowPairs = [];

rows.forEach(a => {
    rows.forEach(b => {
        if (a != b) {
            rowPairs.push([a, b]);
        }
    })
});

const nodes = rowPairs.map((row) => {
    const topNode = new Node(undefined, row, 1);
    topNode.reduce();
    return topNode.sum();
});

console.log(Math.max(...nodes));