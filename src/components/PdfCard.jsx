import React, { useRef } from 'react'
import './PdfCard.css'
import TopLeft from '../Images/top_left.png'
import TopRight from '../Images/top_right.png'
import BottomLeft from '../Images/bottom_left.png'
import BottomRight from '../Images/bottom_right.png'
import ShivamSiganture from '../Images/Shivam_Signature.png'
import Logo from '../Images/logo.png'
import AbhishekSignature from '../Images/ABHISHEK_Signature.png'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'


const PdfCard = (props) => {

    const { name, course, date, certificateId, onUploadPDF } = props;

    const cardRef = useRef(null);

    const handleSavePDF = () => {
        const cardElement = cardRef.current;
        const scale = 2;

        html2canvas(cardElement, {
            useCORS: true,
            scale: scale * window.devicePixelRatio,
            scrollX: -window.scrollX,
            scrollY: -window.scrollY,
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg', 0.7);
            const imgWidth = canvas.width / scale;
            const imgHeight = canvas.height / scale;

            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [imgWidth, imgHeight],
            });

            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
            const blob = pdf.output('blob');
            onUploadPDF(blob);
        });
    };



    return (
        <div className='w-full h-fit overflow-x-hidden flex justify-center items-center flex-col'>
            <div className='w-[calc(100vw-100px)] h-fit certificate p-5' ref={cardRef} >
                <div className=' inner-card  relative'>
                    <div className='positioned-images'>
                        <img src={TopLeft}
                            alt="topleft"
                            className='absolute -top-10 -left-10 w-[200px] h-auto'
                        />
                        <img src={TopRight} alt=""
                            className='absolute -top-10 -right-10 w-[200px] h-auto' />

                        <img src={BottomLeft} alt=""
                            className='absolute -bottom-10 -left-10 w-[200px] h-auto' />

                        <img src={BottomRight} alt=""
                            className='absolute -bottom-10 -right-10 w-[200px] h-auto' />

                    </div>
                    <div className='information'>
                        <h1 className='text-center text-6xl font-semibold mt-14'>CERTIFICATE OF COMPLETION</h1>
                        <p className='text-center mt-5 font-bold text-2xl space-x-8'>
                            This certificate is proudly presented to
                        </p>

                        <h1 className='name font-bold text-7xl mt-10 text-center'>{name}</h1>

                        <p className='text-4xl mt-10 font-semibold text-center'>
                            For successfully completing the Tutedude
                            <span> {course}</span>
                        </p>
                        <p className='font-semibold mt-2 text-4xl text-center'>course on
                            <span> {date}</span>
                        </p>

                        <p className='text-3xl font-semibold mt-10 text-center'>
                            Tutedude wishes you the best for your future endeavours.
                        </p>
                    </div>

                    <div className='flex justify-around'>
                        <div className='flex flex-col justify-center items-center gap-y-1'>
                            <img src={ShivamSiganture} alt="ssignature" className='w-[250px] h-auto' />
                            <div className='w-[300px] h-1 bg-[#c8842c]'></div>
                            <p className='font-semibold names'>SHIVAM GOYAL</p>
                            <p>Co-Founder</p>
                        </div>

                        <div>
                            <img src={Logo} alt="logo" className='w-[250px] h-auto' />
                        </div>

                        <div className='flex flex-col justify-center items-center gap-y-1'>
                            <img src={AbhishekSignature} alt="asignature" className='w-[250px] h-auto top-6 relative' />
                            <div className='w-[300px] h-1 bg-[#c8842c]'></div>
                            <p className='font-semibold names'>ABHISHEK GANGWAR</p>
                            <p>Co-Founder</p>
                        </div>
                    </div>

                    <p className='text-end font-normal pr-[100px] py-10 text-2xl'>Certificate id :  <span className='font-bold text-lg'>{certificateId}</span></p>


                </div>
            </div>

            <button
                className="px-4 py-2 border rounded-lg bg-blue-100"
                onClick={handleSavePDF}
            >
                Upload On Drive
            </button>




        </div>
    )
}

export default PdfCard