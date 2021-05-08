import React from 'react';
import { formatRelative } from 'date-fns';

const Message = ({
        createdAt = null,
        text = '',
        displayName = '',
        photoURL = '',
    }) => {
        return ( <
            div className = 'photodatename' >
            <
            div className = 'photourl' > {
                photoURL ? ( <
                    img src = { photoURL }
                    alt = 'Avatar'
                    width = { 45 }
                    height = { 45 }
                    />
                ) : null
            } < /div>

            {
                displayName ? < p className = 'Name' > { displayName } < /p> :null} 

                {
                    createdAt ? ( <
                        span className = 'date' > {
                            formatRelative(new Date(createdAt.seconds * 1000), new Date())
                        } <
                        /span>
                    ) : null
                }


                <
                p className = 'text' > { text } < /p>  < /
                    div > )
        }
        export default Message;