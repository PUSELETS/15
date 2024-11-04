import * as React from 'react';


export const EmailTemplate: React.FC<Readonly<{href: string}>> = async ({
    href
}) =>
(  
    <>
        <div >
            <a href={href}>verify account</a>
        </div>
    </>
);

