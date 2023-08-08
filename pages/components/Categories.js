import Categories from '../api/categories/categories';

const AllCategories = () => {

    return (
        <div className="category_grid container">
              <div className="row">
        
        {
            
            Categories.map((item) => (
              
                <div  key = {item.id} className="category_grid col-sm-6 col-md-4 col-lg-4">
                    <div className="thumbnail">
                    <img className="category_image" src={item.imagepath} />
                    </div>
                    <div className="category_body">
                        <h2 className="text-center">{item.name}</h2>
                    </div>
                    </div>
                   
                
            )
            
            )
        }
         </div>
        </div>
          
    )
  

}

export default AllCategories;