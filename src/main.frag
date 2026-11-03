#version 120 // glsl version 1.2 for OpenGL 2.1

uniform vec2 resolution;
uniform vec2 mousePos;
uniform float time;

void main(void) {
    // Fragment shader should output into gl_FragColor an RGBA:
    vec2 pixelPos = gl_FragCoord.xy;
    vec2 uv = pixelPos / resolution;
    mat2 rot = mat2(cos(time), -sin(time), sin(time), cos(time));
    //mat2 rot = mat2(1, 0, 0, 1); //For testing blur
    uv = rot * (uv - 0.5) + 0.5;

    if (mod(time, 10.0) < 5.0) {
        gl_FragColor = vec4(uv.x, uv.y, mod(time / 5.0, 1.0), 1.0);
    } else {
        gl_FragColor = vec4(uv.x, uv.y, 1 - mod(time / 5.0, 1.0), 1.0);
    }

    float dist = distance(pixelPos, mousePos);
    float radius = 10.0;
    if (dist < radius) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
}
