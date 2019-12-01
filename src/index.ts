import { GaussFilter } from './filters/gauss';
const PATH_TO_IMAGE = 'public/img/photo.jpg';

const srcImage = new Image(200, 266);
srcImage.src = PATH_TO_IMAGE;

const sigmaInput = <HTMLDataElement>document.getElementById('sigma-input');
const sigmaValue = <HTMLDataElement>document.getElementById('sigma-value');

const canvasSrc = <HTMLCanvasElement>document.getElementById('src-img');
const canvasDist = <HTMLCanvasElement>document.getElementById('transform-img');
const srcCtx = canvasSrc.getContext('2d');
const distCtx = canvasDist.getContext('2d');

function handleImage(sigma: number) {
    sigmaValue.innerHTML = sigma.toString();
    const gaussFilter = new GaussFilter(sigma);

    const srcImageData = srcCtx.getImageData(0, 0, srcImage.width, srcImage.height);
    const transformImage = gaussFilter.handleImage(srcImageData);
    distCtx.putImageData(transformImage, 0, 0);
}

srcImage.onload = () => {
    srcCtx.drawImage(srcImage, 0, 0, srcImage.width, srcImage.height);
    handleImage(parseInt(sigmaInput.value));
    // @ts-ignore
    sigmaInput.onchange = (e: Event) => handleImage(e.srcElement.value);
};
