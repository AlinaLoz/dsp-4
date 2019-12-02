import { Pixel } from "../core/pixel";

export class BoxFilter {
    private readonly N: number;
    private readonly N2: number;

    constructor(N: number) {
        this.N = Math.floor(N);
        this.N2 = Math.floor(N**2);
    }

    _initWindowFilter() {
        const windowFilter = new Array<number>(this.N2 + 1);
        windowFilter[0] = 1;
        for (let i = 1; i < this.N; i++) {
            windowFilter[i] = 1 / this.N2;
            windowFilter[-i] = windowFilter[i];
        }
        return windowFilter;
    }

    handleImage(srcImage: ImageData): ImageData {
        const windowFilter: Array<number> = this._initWindowFilter();
        for (let j = 0; j < srcImage.height; j++) {
            let tmp: number[] = [];
            for (let i = 0; i < srcImage.width; i++) {
                let sum = 0.0;
                let pxl = new Pixel();
                for (let k = -this.N + 1; k < this.N; k++) {
                    let l = i + k;
                    if (l > 0 && l < srcImage.width) {
                        const [r, g, b, a] = srcImage.data.subarray(j * (srcImage.width * 4) + l * 4, j * (srcImage.width  * 4) + l * 4 + 4);
                        pxl.r += r * windowFilter[k];
                        pxl.g += g * windowFilter[k];
                        pxl.b += b * windowFilter[k];
                        pxl.a += a;
                        sum += windowFilter[k];
                    }
                }
                tmp.push(pxl.r, pxl.g, pxl.b, pxl.a);
            }
            for (let i = 0; i < srcImage.width; i++) {
                srcImage.data[j * (srcImage.width * 4) + i * 4] = Math.floor(tmp[i * 4]) ;
                srcImage.data[j * (srcImage.width * 4) + i * 4 + 1] = Math.floor(tmp[i * 4 + 1]);
                srcImage.data[j * (srcImage.width * 4) + i * 4 + 2] = Math.floor(tmp[i * 4 + 2]) ;
                srcImage.data[j * (srcImage.width * 4) + i * 4 + 3] = Math.floor(tmp[i * 4 + 3]) ;
            }
        }

        for (let i = 0; i < srcImage.width; i++) {
            let tmp: number[] = [];
            for (let j = 0; j < srcImage.height; j++) {
                let sum = 0.0;
                let pxl = new Pixel();
                for (let k = -this.N + 1; k < this.N; k++) {
                    let l = j + k;
                    if (l > 0 && l < srcImage.height) {
                        const [r, g, b, a] = srcImage.data.subarray(l * (srcImage.width * 4) + i * 4, l * (srcImage.width  * 4) + i * 4 + 4);
                        pxl.r += r * windowFilter[k];
                        pxl.g += g * windowFilter[k];
                        pxl.b += b * windowFilter[k];
                        pxl.a += a;
                        sum += windowFilter[k];
                    }
                }
                tmp.push(pxl.r, pxl.g, pxl.b, pxl.a);
            }
            for (let j = 0; j < srcImage.height; j++) {
                srcImage.data[j * (srcImage.width * 4) + i * 4] = Math.floor(tmp[j * 4]) ;
                srcImage.data[j * (srcImage.width * 4) + i * 4 + 1] = Math.floor(tmp[j * 4 + 1]) ;
                srcImage.data[j * (srcImage.width * 4) + i * 4 + 2] = Math.floor(tmp[j * 4 + 2]);
                srcImage.data[j * (srcImage.width * 4) + i * 4 + 3] = Math.floor(tmp[j * 4 + 3]) ;
            }
        }


        return srcImage;
    }
}
