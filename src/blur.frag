#version 120 // glsl version 1.2 for OpenGL 2.1

uniform sampler2D sourceTexture;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_TexCoord[0].xy;
    vec2 screenSizePixel = 1.0 / resolution;
    vec4 color = vec4(0.0);

    for (int x = -2; x <= 2; x++) {
        for (int y = -2; y <= 2; y++) {
            vec2 offset = vec2(float(x), float(y)) * screenSizePixel;

            color += texture2D(sourceTexture, uv + offset);
        }
    }

    gl_FragColor = color / 25.0;
}
