// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavbar();
    initCarousel();
    initPasswordToggle();
    initFormValidation();
    initScrollAnimation();
    initSmoothScroll();
    initHoverEffects();
});

// 导航栏初始化
function initNavbar() {
    // 移动端导航栏切换
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse) {
                navbarCollapse.classList.toggle('show');
            }
        });
    }

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
                navbar.classList.remove('shadow-sm');
            } else {
                navbar.classList.add('shadow-sm');
                navbar.classList.remove('shadow-md');
            }
        }
    });
}

// 轮播图初始化
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        // 自动轮播
        let interval;
        const startCarousel = function() {
            interval = setInterval(function() {
                const nextButton = carousel.querySelector('.carousel-control-next');
                if (nextButton) {
                    nextButton.click();
                }
            }, 5000);
        };

        const stopCarousel = function() {
            clearInterval(interval);
        };

        startCarousel();

        // 鼠标悬停时暂停轮播
        carousel.addEventListener('mouseenter', stopCarousel);
        carousel.addEventListener('mouseleave', startCarousel);
    }
}

// 密码显示/隐藏切换
function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('.input-group-text.cursor-pointer');
    passwordToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.querySelector('i').classList.remove('fa-eye-slash');
                this.querySelector('i').classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                this.querySelector('i').classList.remove('fa-eye');
                this.querySelector('i').classList.add('fa-eye-slash');
            }
        });
    });
}

// 表单验证
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // 密码确认验证
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            const password = document.getElementById('password');
            if (password && this.value !== password.value) {
                this.setCustomValidity('两次输入的密码不一致');
            } else {
                this.setCustomValidity('');
            }
        });
    }
}

// 滚动动画
function initScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 悬停效果
function initHoverEffects() {
    // 卡片悬停效果
    const cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // 按钮悬停效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(button) {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 链接悬停效果
    const links = document.querySelectorAll('a:not(.nav-link):not(.btn)');
    links.forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// 登录表单提交
function handleLoginSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
        // 模拟登录请求
        const username = form.querySelector('#username').value;
        const password = form.querySelector('#password').value;
        
        // 显示加载状态
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> 登录中...';
        
        // 模拟网络请求
        setTimeout(function() {
            // 登录成功
            submitButton.innerHTML = '<i class="fas fa-check"></i> 登录成功';
            submitButton.classList.remove('btn-dark');
            submitButton.classList.add('btn-success');
            
            // 跳转到首页
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1000);
        }, 1500);
    } else {
        form.classList.add('was-validated');
    }
}

// 注册表单提交
function handleRegisterSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
        // 模拟注册请求
        const username = form.querySelector('#username').value;
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;
        
        // 显示加载状态
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> 注册中...';
        
        // 模拟网络请求
        setTimeout(function() {
            // 注册成功
            submitButton.innerHTML = '<i class="fas fa-check"></i> 注册成功';
            submitButton.classList.remove('btn-dark');
            submitButton.classList.add('btn-success');
            
            // 跳转到登录页
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 1000);
        }, 1500);
    } else {
        form.classList.add('was-validated');
    }
}

// 评价表单提交
function handleReviewSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
        // 模拟提交请求
        const rating = form.querySelector('input[name="rating"]:checked').value;
        const content = form.querySelector('#reviewContent').value;
        
        // 显示加载状态
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> 提交中...';
        
        // 模拟网络请求
        setTimeout(function() {
            // 提交成功
            submitButton.innerHTML = '<i class="fas fa-check"></i> 提交成功';
            submitButton.classList.remove('btn-dark');
            submitButton.classList.add('btn-success');
            
            // 重置表单
            setTimeout(function() {
                form.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.classList.remove('btn-success');
                submitButton.classList.add('btn-dark');
                
                // 显示成功消息
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-4';
                successMessage.textContent = '评价提交成功，感谢您的反馈！';
                form.parentNode.appendChild(successMessage);
                
                // 3秒后移除成功消息
                setTimeout(function() {
                    successMessage.remove();
                }, 3000);
            }, 1000);
        }, 1500);
    } else {
        form.classList.add('was-validated');
    }
}

// 话题表单提交
function handleTopicSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
        // 模拟提交请求
        const title = form.querySelector('#topicTitle').value;
        const content = form.querySelector('#topicContent').value;
        
        // 显示加载状态
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> 提交中...';
        
        // 模拟网络请求
        setTimeout(function() {
            // 提交成功
            submitButton.innerHTML = '<i class="fas fa-check"></i> 提交成功';
            submitButton.classList.remove('btn-dark');
            submitButton.classList.add('btn-success');
            
            // 重置表单
            setTimeout(function() {
                form.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.classList.remove('btn-success');
                submitButton.classList.add('btn-dark');
                
                // 显示成功消息
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-4';
                successMessage.textContent = '话题发布成功！';
                form.parentNode.appendChild(successMessage);
                
                // 3秒后移除成功消息
                setTimeout(function() {
                    successMessage.remove();
                }, 3000);
            }, 1000);
        }, 1500);
    } else {
        form.classList.add('was-validated');
    }
}

// 作业提交
function handleHomeworkSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
        // 模拟提交请求
        const homeworkFile = form.querySelector('#homeworkFile').files[0];
        const comment = form.querySelector('#homeworkComment').value;
        
        // 显示加载状态
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> 提交中...';
        
        // 模拟网络请求
        setTimeout(function() {
            // 提交成功
            submitButton.innerHTML = '<i class="fas fa-check"></i> 提交成功';
            submitButton.classList.remove('btn-dark');
            submitButton.classList.add('btn-success');
            
            // 重置表单
            setTimeout(function() {
                form.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.classList.remove('btn-success');
                submitButton.classList.add('btn-dark');
                
                // 显示成功消息
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-4';
                successMessage.textContent = '作业提交成功！';
                form.parentNode.appendChild(successMessage);
                
                // 3秒后移除成功消息
                setTimeout(function() {
                    successMessage.remove();
                }, 3000);
            }, 1000);
        }, 1500);
    } else {
        form.classList.add('was-validated');
    }
}

// 评分星星交互
function initRatingStars() {
    const ratingStars = document.querySelectorAll('.rating-stars .star');
    ratingStars.forEach(function(star, index) {
        star.addEventListener('click', function() {
            // 选中当前星星及之前的星星
            ratingStars.forEach(function(s, i) {
                if (i <= index) {
                    s.classList.add('text-yellow-400');
                    s.classList.remove('text-gray-300');
                    s.querySelector('i').classList.remove('far');
                    s.querySelector('i').classList.add('fas');
                } else {
                    s.classList.remove('text-yellow-400');
                    s.classList.add('text-gray-300');
                    s.querySelector('i').classList.remove('fas');
                    s.querySelector('i').classList.add('far');
                }
            });
            
            // 更新隐藏输入值
            const ratingInput = document.querySelector('input[name="rating"]');
            if (ratingInput) {
                ratingInput.value = index + 1;
            }
        });
    });
}

// 初始化所有事件监听器
function initEventListeners() {
    // 登录表单
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // 注册表单
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
    
    // 评价表单
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmit);
    }
    
    // 话题表单
    const topicForm = document.getElementById('topicForm');
    if (topicForm) {
        topicForm.addEventListener('submit', handleTopicSubmit);
    }
    
    // 作业表单
    const homeworkForm = document.getElementById('homeworkForm');
    if (homeworkForm) {
        homeworkForm.addEventListener('submit', handleHomeworkSubmit);
    }
    
    // 评分星星
    initRatingStars();
}

// 页面加载完成后初始化事件监听器
document.addEventListener('DOMContentLoaded', initEventListeners);

// 响应式设计调整
function handleResponsiveDesign() {
    // 调整轮播图高度
    function adjustCarouselHeight() {
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            const windowHeight = window.innerHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const carouselHeight = windowHeight - navbarHeight - 50;
            
            const carouselItems = carousel.querySelectorAll('.carousel-item img');
            carouselItems.forEach(function(item) {
                item.style.height = `${Math.max(carouselHeight, 300)}px`;
            });
        }
    }
    
    // 初始调整
    adjustCarouselHeight();
    
    // 窗口大小变化时调整
    window.addEventListener('resize', adjustCarouselHeight);
}

// 初始化响应式设计
document.addEventListener('DOMContentLoaded', handleResponsiveDesign);