export class SobelFilter {

    handleImage(srcImage: ImageData): ImageData {
        const gx = [
            [ -1, 0, 1 ],
            [ -2, 0, 2 ],
            [ -1, 0, 1 ],
        ];
        const gy = [
            [ 1, 2 , 1 ],
            [ 0, 0, 0 ],
            [  -1, -2, -1 ],
        ];

        for (let i = 1; i < srcImage.width - 1; i++) {
            for (let j = 1; j < srcImage.height - 1; j++) {
                let dx_r = 0;
                let dy_r = 0;

                for (let wi = -1; wi < 2; wi++) {
                    for (let wj = -1 ; wj < 2; wj++) {
                        dx_r += gx[wi + 1][wj + 1] * srcImage.data[(j + wj) * (srcImage.width * 4) + (i + wi) * 4];
                        dy_r += gy[wi + 1][wj + 1] * srcImage.data[(j + wj) * (srcImage.width * 4) + (i + wi) * 4];
                    }
                }
                const r = Math.floor(Math.sqrt(dx_r*dx_r + dy_r*dy_r));
                if (r > 255) {
                    srcImage.data[j * (srcImage.width * 4) + i * 4] = 0;
                    srcImage.data[j * (srcImage.width * 4) + i * 4 + 1] = 0;
                    srcImage.data[j * (srcImage.width * 4) + i * 4 + 2] = 0;
                } else {
                    srcImage.data[j * (srcImage.width * 4) + i * 4] = r;
                    srcImage.data[j * (srcImage.width * 4) + i * 4 + 1] = r;
                    srcImage.data[j * (srcImage.width * 4) + i * 4 + 2] = r;
                    srcImage.data[j * (srcImage.width * 4) + i * 4 + 3] = 255;
                }
            }
        }

        return srcImage;
    }
}
