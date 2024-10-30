import * as React from 'react';


export const EmailTemplate: React.FC<Readonly<{href: string, token:string}>> = async ({
    href,
    token
}) =>
(  
    <>
        {token}
        <div >
            <a href={href}>verify account</a>
        </div>
    </>
);

