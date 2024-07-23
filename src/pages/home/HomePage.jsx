import React from 'react';
import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/heroSection/HeroSection';
import Category from '../../components/category/Category';
import HomePageProductCard from '../../components/homePageProductCard/HomePageProductCard';
import Track from '../../components/track/Track';
import Testimonial from '../../components/testimonial/Testimonial';
import Loader from './../../components/loader/Loader';
import Filter from '../../components/filter/Filter';
import HorizontalRow from './../../components/horizontalRow/HorizontalRow';
import ScrollToTop from './../../components/buttons/ScrollToTop';

const HomePage = () => {
  return (
    <Layout>
        <ScrollToTop />
        <HeroSection />
        {/* <Filter /> */}
        <HorizontalRow />
        <HomePageProductCard />
        {/* <Track /> */}
        {/* <Testimonial /> */}
        <Category />
        <Loader />
    </Layout>
  )
}

export default HomePage