import { PaymentComponent } from './../components/payment/payment.component';
import { Routes } from '@angular/router';
import { AuthComponent } from '../layouts/auth/auth.component';
import { MainComponent } from '../layouts/main/main.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { LoginComponent } from '../components/login/login.component';

import { AboutComponent } from '../components/about/about.component';
import { HelpComponent } from '../components/help/help.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { SettingComponent } from '../components/setting/setting.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { CourseContentComponent } from '../components/course-content/course-content.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { CartComponent } from '../components/cart/cart.component';
import { WishListComponent } from '../components/wish-list/wish-list.component';
import { MyLearningComponent } from '../components/my-learning/my-learning.component';
import { HomeComponent } from '../components/home/home.component';
import { RegisterComponent } from '../components/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {path:'auth',component:AuthComponent , children:[
        {path:'' , redirectTo:'about' , pathMatch:"full"},
        {path:'login' ,component:LoginComponent , title :'login'},
        {path:'register', component:RegisterComponent , title:'register'},
        {path:'about', component:AboutComponent , title:'about'}
    ]},
    {path:'main',component:MainComponent, children:[
        {path:'' , redirectTo:'home', pathMatch:'full'},
        {path:'home', component:HomeComponent , title:'Home'},
        {path:'help', component:HelpComponent , title:'help'},
        {path:'profile', component:ProfileComponent , title:'profile'},
        {path:'setting', component:SettingComponent , title:'setting'},
        {path:'courseDetails/:c_id', component:CourseDetailsComponent , title:'course Details'},
        {path:'courseContent', component:CourseContentComponent , title:'course Content'},
        {path:'notifications', component:NotificationsComponent , title:'notifications'},
        {path:'cart', component:CartComponent , title:'cart'},
        {path:'wishList', component:WishListComponent , title:'wishList'},
        {path:'myLearning', component:MyLearningComponent , title:'myLearning'},
        {path:'payment', component:PaymentComponent , title:'payment'},
        {path:'about', component:AboutComponent , title:'Aboutus'}
    ]},
    {path:'**',component:NotFoundComponent}
];
