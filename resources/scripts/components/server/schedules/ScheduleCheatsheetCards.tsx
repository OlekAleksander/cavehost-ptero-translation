import React from 'react';
import tw from 'twin.macro';

export default () => {
    return (
        <>
            <div css={tw`md:w-1/2 h-full bg-neutral-600`}>
                <div css={tw`flex flex-col`}>
                    <h2 css={tw`py-4 px-6 font-bold`}>Przykłady</h2>
                    <div css={tw`flex py-4 px-6 bg-neutral-500`}>
                        <div css={tw`w-1/2`}>*/5 * * * *</div>
                        <div css={tw`w-1/2`}>co 5 minut</div>
                    </div>
                    <div css={tw`flex py-4 px-6`}>
                        <div css={tw`w-1/2`}>0 */1 * * *</div>
                        <div css={tw`w-1/2`}>co godzinę</div>
                    </div>
                    <div css={tw`flex py-4 px-6 bg-neutral-500`}>
                        <div css={tw`w-1/2`}>0 8-12 * * *</div>
                        <div css={tw`w-1/2`}>zakres godzin</div>
                    </div>
                    <div css={tw`flex py-4 px-6`}>
                        <div css={tw`w-1/2`}>0 0 * * *</div>
                        <div css={tw`w-1/2`}>raz dziennie</div>
                    </div>
                    <div css={tw`flex py-4 px-6 bg-neutral-500`}>
                        <div css={tw`w-1/2`}>0 0 * * MON</div>
                        <div css={tw`w-1/2`}>każdy poniedziałek</div>
                    </div>
                </div>
            </div>
            <div css={tw`md:w-1/2 h-full bg-neutral-600`}>
                <h2 css={tw`py-4 px-6 font-bold`}>Znaki specjalne</h2>
                <div css={tw`flex flex-col`}>
                    <div css={tw`flex py-4 px-6 bg-neutral-500`}>
                        <div css={tw`w-1/2`}>*</div>
                        <div css={tw`w-1/2`}>dowolna wartość</div>
                    </div>
                    <div css={tw`flex py-4 px-6`}>
                        <div css={tw`w-1/2`}>,</div>
                        <div css={tw`w-1/2`}>separator wartości</div>
                    </div>
                    <div css={tw`flex py-4 px-6 bg-neutral-500`}>
                        <div css={tw`w-1/2`}>-</div>
                        <div css={tw`w-1/2`}>zakres wartości</div>
                    </div>
                    <div css={tw`flex py-4 px-6`}>
                        <div css={tw`w-1/2`}>/</div>
                        <div css={tw`w-1/2`}>wartości krokowe</div>
                    </div>
                </div>
            </div>
        </>
    );
};
