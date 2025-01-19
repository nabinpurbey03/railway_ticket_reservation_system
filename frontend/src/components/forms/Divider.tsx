import React, {ReactElement} from "react";

interface DividerProps {
    dividerName: string;
}

const Divider: React.FC<DividerProps> = ({dividerName}: DividerProps): ReactElement => {
    return (
        <div
            className="bg-gray-300 mt-3 mb-2 border-2 text-blue-900 text-xl"
        >
            {dividerName}
        </div>
    )
}

export default Divider;