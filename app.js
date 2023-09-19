const fsPromises = require('fs/promises');
const path = require('path');

const createChildren = async () => {
    try {
        await fsPromises.mkdir(path.resolve('hw1'), {recursive: true});
        for (let i = 1; i <= 5; i++) {
            await fsPromises.mkdir(path.resolve('hw1', `child${i}`), {recursive: true});
            await fsPromises.writeFile(path.resolve('hw1', `file${i}.txt`), '')
        }
        console.log('dir hw1 with children was created');
    } catch (e) {
        throw new Error(e.message);
    }
}


// Variant 1

const filterChildrenTypes = async () => {
    try {
        let dirInfo = await fsPromises.readdir(path.resolve('hw1'), {withFileTypes: true});
        return dirInfo.map(child => child.isFile() ? `FILE: ${child.name}` : `DIR: ${child.name}`);
    } catch (e) {
        throw new Error(e.message);
    }
}

// Variant 2

const filterChildrenTypes2 = async () => {
    try {
        let dirInfo = await fsPromises.readdir(path.resolve('hw1'));
        for (const child of dirInfo) {
            let stats = await fsPromises.stat(path.resolve('hw1', child));
            if(stats.isFile()) {
                console.log(`FILE: ${child}`);
            } else if (stats.isDirectory()) {
                console.log(`DIR: ${child}`);
            }
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

createChildren().then(() => {
    filterChildrenTypes().then(value => console.log(value)).catch(e => console.log(e.message));
    filterChildrenTypes2().catch(e => console.log(e.message));
}).catch(e => console.log(e.message));

