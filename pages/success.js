import Link from "next/link";
import { GrStatusGood } from "react-icons/gr";


export default function SuccessPage() {
    return (
        <div className="text-center mx-auto font-article">
            <GrStatusGood className="justify-center mx-auto text-6xl text-green-600" />
            <p className="text-2xl p-2">Paiement validé !</p>
            <p className="p-1">Votre commande a bien été prise en compte, vous recevrez un mail de confirmation d'ici quelques heures.</p>
            <p className="p-1 mb-6 font-bold text-gray-800">À très bientôt !</p>
            <Link href={'/'} className="bg-red-300 p-2 text-white">RETOUR À L'ACCUEIL</Link>
        </div>
    )
}