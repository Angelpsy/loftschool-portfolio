const vertexShader = `
varying vec2 v_position;
uniform vec2 u_size;
uniform vec2 u_resolution;
attribute vec2 a_pos;

void main() {
    v_position = (position.xy+1.0)*0.5;
    gl_Position =  vec4(position, 1.0);
}
`;

module.exports = vertexShader;
