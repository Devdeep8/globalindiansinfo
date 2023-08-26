// pages/index.js
'use client'
import React from 'react';
import Carousel from '../components/Carousel';
import Categories from '../components/categories/Featured';
import Globes from '../components/GlobeSection';
import FeaturedBlogs from '../components/categories/articles/Latest'
import Sponsors from '../components/Sponsers'
import AdBanner from '../components/AdBanners'

const HomePage = () => {
  return (
  
  <div className="home_page">
  <section className="carousel_section">
	  <Carousel />
    </section>
  <section className="section featured_blogs_section">
	  <FeaturedBlogs />
    </section>
    <section className="section categories_section">
    <h1 className="text-center"><span className="green">Important</span> Categories</h1>
    <Categories/>
    </section>
    <section className="section adbanner">
     <AdBanner/>
    </section>
    <section className="section globe_section">
     <Globes/>
    </section>
    
    <section className="sponsors_section">
     <Sponsors/>
    </section>
   

    </div>
    
    
  );
};

HomePage.layout = 'construction';
export default HomePage;
