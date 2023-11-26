import Link from "next/link"

interface ICategories {
    id: number,
    character: string,
    seoUrl: string
}
const HomePage = ({ categories }: { categories: ICategories[] }) => {

    return (
        <div className="container">
            <div className="row">
                <h4 className="text-center">Select Category</h4>
                <Link href="/random" className="col-sm-12 col-md-3 bg-info-subtle
                text-success-emphasis p-1 m-1 border text-center link-underline-dark"> Random </Link>

                {
                    categories.map((item, index) => (

                        <Link
                            style={{ width: "40px" }}
                            key={item.id}
                            className="col-sm-4 col-md-1 bg-info-subtle
                        text-success-emphasis p-1 m-1 border text-center link-underline-dark"
                            href={`/category/${item.id}`}>{item.character}</Link>

                    ))
                }</div>
        </div>

    )
}

export default HomePage