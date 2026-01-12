from django.urls import path
from .views import (
    seller_signup,
    seller_login,
    seller_list,
    seller_profile,
    seller_products,
    add_product,
)

urlpatterns = [
    path("signup/", seller_signup, name="seller-signup"),
    path("login/", seller_login, name="seller-login"),
    path("list/", seller_list, name="seller-list"),
    path("<int:seller_id>/", seller_profile, name="seller-profile"),
    path("<int:seller_id>/products/", seller_products, name="seller-products"),
    path("<int:seller_id>/products/add/", add_product, name="add-product"),
]
