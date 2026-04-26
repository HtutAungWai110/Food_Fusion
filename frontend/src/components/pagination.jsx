import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Pagination({currentPage, maxPage, setPage}){
    let min = Math.max(1, currentPage - 5);
    let max = Math.min(maxPage, currentPage + 5)

    const range = Array.from({ length: max - min + 1 }, (_, i) => min + i);

 
    console.log(range)
    return (
        <div className="flex justify-center gap-5 m-10">
            <button disabled={currentPage === 1} onClick={() => setPage(prev => prev - 1)} className="border rounded-2xl p-2 opacity-70 hover:opacity-80 active:bg-orange-500"><ArrowLeft/></button>
            {
                range.map((page, index) => 
                <button className={`${page === currentPage ? "bg-orange-500 text-background" : "bg-gray-300"} p-2 w-[50px] h-[50px] rounded-2xl border`} key={index} onClick={() => setPage(page)}>{page}</button>)
            }
            <button disabled={currentPage === maxPage} onClick={() => setPage(prev => prev + 1)}  className="border rounded-2xl p-2 opacity-70 hover:opacity-80 active:bg-orange-500"><ArrowRight/></button>
        </div>
    )

}