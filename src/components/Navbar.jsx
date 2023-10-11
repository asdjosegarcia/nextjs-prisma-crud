import Link from "next/link"/* importamos link, etiquete que nos redirije a a otra pagina con una precarga */

function Navbar() {
    return (
        <div className="bg-slate-900">
            <div className="container mx-auto flex justify-between items-center py-3">
                <Link href={"/"}>
                <h3 className="font-bold text-3xl">
                    NextCRUD
                </h3>
                </Link>
                <ul className="flex gap-x-2 text-lg font-bold">
                    <li>
                        <Link 
                        className="text-slate-300 hover:text-slate-200"
                        href="/new"> {/* nos mansa a new para crear una nueva tarea */}
                            New
                        </Link>
                    </li>
                    <li>
                        <Link 
                        className="text-slate-300 hover:text-slate-200"
                        href="/about"> 
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Navbar