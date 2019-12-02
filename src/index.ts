import { GaussFilter } from './filters/gauss';
import { SobelFilter } from "./filters/sobel";
import { BoxFilter } from "./filters/box";

const PATH_TO_IMAGE = 'public/img/photo.jpg';

const srcImage = new Image(200, 266);
srcImage.src = PATH_TO_IMAGE;

const sigmaInput = <HTMLDataElement>document.getElementById('sigma-input');
const sigmaValue = <HTMLDataElement>document.getElementById('sigma-value');

const canvasSrc = <HTMLCanvasElement>document.getElementById('src-img');
const canvasGauss = <HTMLCanvasElement>document.getElementById('gauss-img');
const canvasSobel = <HTMLCanvasElement>document.getElementById('sobel-img');
const canvasBox = <HTMLCanvasElement>document.getElementById('box-img');

const srcCtx = canvasSrc.getContext('2d');
const gaussCtx = canvasGauss.getContext('2d');
const sobelCtx = canvasSobel.getContext('2d');
const boxCtx = canvasBox.getContext('2d');

function handleImage(sigma: number) {
    sigmaValue.innerHTML = sigma.toString();
    const gaussFilter = new GaussFilter(sigma);
    const boxFilter = new BoxFilter(sigma);

    const srcImageData_1 = srcCtx.getImageData(0, 0, srcImage.width, srcImage.height);
    const srcImageData_2 = srcCtx.getImageData(0, 0, srcImage.width, srcImage.height);

    const gaussImage = gaussFilter.handleImage(srcImageData_1);
    const boxImage = boxFilter.handleImage(srcImageData_2);

     gaussCtx.putImageData(gaussImage, 0, 0);
    boxCtx.putImageData(boxImage, 0, 0);
}

srcImage.onload = () => {
    srcCtx.drawImage(srcImage, 0, 0, srcImage.width, srcImage.height);
    handleImage(parseInt(sigmaInput.value));
    const sobelFilter = new SobelFilter();
    const srcImageData_1 = srcCtx.getImageData(0, 0, srcImage.width, srcImage.height);
    const sobelImage = sobelFilter.handleImage(srcImageData_1);
    sobelCtx.putImageData(sobelImage, 0, 0);
    // @ts-ignore
    sigmaInput.onchange = (e: Event) => handleImage(e.srcElement.value);
};
