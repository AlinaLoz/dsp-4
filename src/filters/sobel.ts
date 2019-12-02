export class SobelFilter {

    handleImage(srcImage: ImageData): ImageData {
        const tmp = [...srcImage.data];
        const gx = [
            [ -1, -2, -1 ],
            [ 0, 0, 0 ],
            [ 1, 2, 1 ],
        ];
        const gy = [
            [ -1, 0 , 1 ],
            [ -2, 0, 2 ],
            [  -1, 0, 1 ],
        ];

        console.log(gx, gy);

        for (let i = 1; i < srcImage.height - 1; i++) {
            for (let j = 1; j < srcImage.width - 1; j++) {
                let dx_r = 0;
                let dy_r = 0;
                // let sum = 0;
                for (let wi = -1; wi < 2; wi++) {
                    for (let wj = -1 ; wj < 2; wj++) {
                        const r = srcImage.data[(i + wi) * (srcImage.width * 4) + (j + wj) * 4] * 0.299;
                        const g = srcImage.data[(i + wi) * (srcImage.width * 4) + (j + wj) * 4 + 1] * 0.587;
                        const b = srcImage.data[(i + wi) * (srcImage.width * 4) + (j + wj) * 4 + 2] * 0.114;
                        dx_r += gx[wi + 1][wj + 1] * (r + g + b);
                        dy_r += gy[wi + 1][wj + 1] * (r + g + b);
                        // sum += srcImage.data[(i + wi) * (srcImage.width * 4) + (j + wj) * 4];
                    }
                }
                // dx_r /= sum;
                // dy_r /= sum;

                let r = Math.sqrt(dx_r*dx_r + dy_r*dy_r);

                // r *= 255;
                // console.log(r);
                // if (r > 255) {
                // srcImage.data[i * (srcImage.width * 4) + j * 4] = 0;
                // srcImage.data[i * (srcImage.width * 4) + j * 4 + 1] = 0;
                // srcImage.data[i * (srcImage.width * 4) + j * 4 + 2] = 0;
                // } else {
                    tmp[i * (srcImage.width * 4) + j * 4] = r;
                    tmp[i * (srcImage.width * 4) + j * 4 + 1] = r;
                    tmp[i * (srcImage.width * 4) + j * 4 + 2] = r;
                    tmp[i * (srcImage.width * 4) + j * 4 + 3] = 255;
                // }
            }
        }
        for (let i = 0; i< srcImage.data.length; i++) {
            srcImage.data[i] = tmp[i];
        }
        return srcImage;
    }
}
