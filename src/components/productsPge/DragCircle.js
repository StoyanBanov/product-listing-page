import React from 'react';
import Draggable from 'react-draggable';

export class DragCircle extends React.Component {

    render() {
        return (
            <Draggable
                axis="x"
                handle=".handle"
                defaultPosition={{ x: 0, y: 0 }}
                position={null}
                grid={[25, 25]}
                scale={1}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}
            >
                <div>
                    <div>sdasdsd
                        sdsadsaasd
                    </div>
                </div>

            </Draggable>
        );
    }
}