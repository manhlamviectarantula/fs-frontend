import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className="container-fluid footer py-5">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item">
                                <h4 className="mb-4 text-white">Bản tin điện tử</h4>
                                <p className="text-white">Đăng ký ngay và là người đầu tiên nắm được thông tin khi có mặt hàng mới, khuyến mãi, các sự kiện sắp diễn ra tại cửa hàng và nhiều thông tin hữu ích khác.</p>
                                <div className="position-relative mx-auto rounded-pill">
                                    <input className="form-control rounded-pill border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Nhập email" />
                                    <button style={{ background: '#54a5ac', color: 'white' }} type="button" className="btn btn-primary-outline-0 rounded-pill position-absolute top-0 end-0 py-2 mt-2 me-2">Đăng ký ngay</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="mb-4 text-white">Về FASHION</h4>
                                <a href="/"><i className="fas fa-angle-right me-2"></i> Thông tin</a>
                                <a href="/"><i className="fas fa-angle-right me-2"></i> Danh sách của hàng</a>
                                <a href="/"><i className="fas fa-angle-right me-2"></i> Cơ hội nghề nghiệp</a>
                                <a href="/"><i className="fas fa-angle-right me-2"></i> Chính sách đổi trả</a>
                                <a href="/"><i className="fas fa-angle-right me-2"></i> Chính sách bảo hành</a>
                                <a href="/"><i className="fas fa-angle-right me-2"></i> Chính sách bảo mật</a>
                                <a href="/"><i className="fas fa-angle-right me-2"></i> Chương trình Membership</a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="mb-4 text-white">Giờ hoạt động</h4>
                                <p className="mb-0">Cửa hàng: <span className="text-white"> 09:00 am - 10:00 pm </span></p>
                                <p className="mb-0">Tổng đài: <span className="text-white"> 09:00 am - 08:00 pm</span></p>
                                <h4 className="my-4 text-white">Trụ sở chính</h4>
                                <p className="mb-0"><i className="fas fa-map-marker-alt text-secondary me-2"></i>MANH</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="mb-4 text-white">Tài khoản xã hội</h4>
                                <a href="/"><i className="fas fa-angle-right me-2"></i> Faceboock</a>
                                <a href="/"><i className="fas fa-angle-right me-2"></i> Instagram</a>
                                <a href="/"><i className="fas fa-angle-right me-2"></i> Twitter</a>
                                <h4 className="my-4 text-white">Liên hệ</h4>
                                <p className="mb-0"><i className="fas fa-envelope text-secondary me-2"></i> info@example.com</p>
                                <p className="mb-0"><i className="fas fa-phone text-secondary me-2"></i> (+84) 3456 7890 123</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Copyright Start --> */}
            <div class="container-fluid copyright py-4">
                <div class="container">
                    <div class="align-items-center text-center">
                        <span class="text-light">
                            <a href="/">
                                <i class="fas fa-copyright text-light me-2"></i>
                                <span class="text-light">FASHION from </span>
                               MANH </a>
                        </span>
                    </div>
                </div>
            </div>
            {/* <!-- Copyright End --> */}
        </div>
    )
}

export default Footer
