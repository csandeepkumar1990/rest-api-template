const DealService = require('../services/dealfiles.service');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs-extra');

const PATH_SEPARATOR = '/';
//const CONTACTFILE_DIR = process.env.TEMP_DIR + PATH_SEPARATOR + 'dealfile'
const CONTACTFILE_DIR = './public/files' + PATH_SEPARATOR + 'dealfile'
console.log(CONTACTFILE_DIR);
const graphicsMagik = require('gm');
const _makeDirIfNotExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
};

const _createDynamicDealFileDir = (id) => {
    _makeDirIfNotExists(CONTACTFILE_DIR);
    //make folder for the material and upload images
    let dir = CONTACTFILE_DIR + PATH_SEPARATOR + id + PATH_SEPARATOR;
    _makeDirIfNotExists(dir);
    return dir;
}

const _createUniqueFileName = (file) => {
    return crypto.randomBytes(10).toString('hex') + '_' + Date.now() + path.extname(file.name);
}

const _saveFile = (file, fieldName, dealFileId, dealId, fileDir, fileName) => {

    return new Promise((resolve, reject) => {
        const fullPath = fileDir + fileName;
        file.mv(fullPath, async function (err) {
            if (err)
                reject(new Error('Error occurred while uploading the deal file: ' + err.message));

            const dealFile = {
                fieldName: fieldName,
                dealId: dealId,
                originalName: file.name,
                encoding: file.encoding,
                mimeType: file.mimetype,
                destination: fileDir,
                fileName: fileName,
                path: fullPath.replace('.', ''),
                thumbPath: file.thumbPath,
                size: file.size,
                approved: "false"
            }

            const query = {
                where: {
                    id: dealFileId
                }
            }
            const result = await DealService.update(dealFile, query);
            resolve(result);
        });
    });
}


const _saveThumbPath = async (dealFileId, fileDir, fileName, file) => {
    try {
        const thumbFilePath = fileDir + "thumbFile.jpg";
        const fullPath = fileDir + fileName;
        // Create JPG from page 0 of the PDF
        graphicsMagik(fullPath) // The name of your pdf
            .setFormat("jpg")
            .resize(300) // Resize to fixed 200px width, maintaining aspect ratio
            .quality(100) // Quality from 0 to 100
            .write(thumbFilePath, function (error) {
                // Callback function executed when finished
                if (!error) {
                } else {
                }
            });
        const dealFile = {
            thumbPath: thumbFilePath.replace('.', '')
        }
        const query = {
            where: {
                id: dealFileId
            }
        }
        await DealService.update(dealFile, query);
    } catch (error) {
        console.log(error);
    }
}

exports.storeFile = async (file, fieldName, dealFileId, dealId) => {
    const fileDir = _createDynamicDealFileDir(dealFileId);
    const fileName = _createUniqueFileName(file);

    try {
        const dealFileSavedFile = await _saveFile(file, fieldName, dealFileId, dealId, fileDir, fileName);
        await _saveThumbPath(dealFileSavedFile.id, fileDir, fileName, file);
    } catch (err) {
        console.log(err);
    }
}


exports.storeFiles = async (file, fieldName, dealFileId, dealId) => {
    await Promise.all(files.dealFile.map((file) => {
        return new Promise(async (resolve) => {
            const fileDir = _createDynamicDealFileDir(dealFileId);
            const fileName = _createUniqueFileName(file);
            await _saveFile(file, fieldName, dealFileId, dealId, fileDir, fileName);
            resolve();
        });
    }));
}


