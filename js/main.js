// 初始化Supabase客户端
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-anon-key';
const { createClient } = supabase;
const supabase = createClient(supabaseUrl, supabaseKey);

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
    // 初始化Supabase功能
    initSupabase();
});

// 初始化Supabase功能
function initSupabase() {
    // 检查用户是否已登录
    checkUserSession();
    // 加载课程评价
    loadReviews();
    // 加载师生互动话题
    loadTopics();
    // 加载作业列表
    loadHomeworks();
}

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

// 检查用户会话
async function checkUserSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        // 用户已登录，更新UI
        updateUIForLoggedInUser(session.user);
    }
}

// 更新登录用户的UI
function updateUIForLoggedInUser(user) {
    // 这里可以更新导航栏，显示用户信息等
    console.log('用户已登录:', user);
}

// 登录表单提交
async function handleLoginSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
        const email = form.querySelector('#username').value;
        const password = form.querySelector('#password').value;
        
        // 显示加载状态
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> 登录中...';
        
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) {
                throw error;
            }
            
            // 登录成功
            submitButton.innerHTML = '<i class="fas fa-check"></i> 登录成功';
            submitButton.classList.remove('btn-dark');
            submitButton.classList.add('btn-success');
            
            // 跳转到首页
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1000);
        } catch (error) {
            // 登录失败
            submitButton.innerHTML = '<i class="fas fa-times"></i> 登录失败';
            submitButton.classList.remove('btn-dark');
            submitButton.classList.add('btn-danger');
            alert('登录失败: ' + error.message);
            
            // 恢复按钮状态
            setTimeout(function() {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.classList.remove('btn-danger');
                submitButton.classList.add('btn-dark');
            }, 2000);
        }
    } else {
        form.classList.add('was-validated');
    }
}

// 注册表单提交
async function handleRegisterSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
        const name = form.querySelector('#firstName').value;
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;
        
        // 显示加载状态
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> 注册中...';
        
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name
                    }
                }
            });
            
            if (error) {
                throw error;
            }
            
            // 注册成功
            submitButton.innerHTML = '<i class="fas fa-check"></i> 注册成功';
            submitButton.classList.remove('btn-dark');
            submitButton.classList.add('btn-success');
            
            // 跳转到登录页
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 1000);
        } catch (error) {
            // 注册失败
            submitButton.innerHTML = '<i class="fas fa-times"></i> 注册失败';
            submitButton.classList.remove('btn-dark');
            submitButton.classList.add('btn-danger');
            alert('注册失败: ' + error.message);
            
            // 恢复按钮状态
            setTimeout(function() {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.classList.remove('btn-danger');
                submitButton.classList.add('btn-dark');
            }, 2000);
        }
    } else {
        form.classList.add('was-validated');
    }
}

// 加载课程评价
async function loadReviews() {
    try {
        const { data: reviews, error } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            throw error;
        }
        
        // 渲染评价列表
        renderReviews(reviews);
    } catch (error) {
        console.error('加载评价失败:', error);
    }
}

// 渲染评价列表
function renderReviews(reviews) {
    const reviewList = document.querySelector('.review-list');
    if (!reviewList) return;
    
    // 清空现有评价
    reviewList.innerHTML = '';
    
    // 添加新评价
    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item border-bottom border-gray-100 p-6';
        
        reviewItem.innerHTML = `
            <div class="review-header d-flex justify-between items-start mb-4">
                <div class="reviewer-info d-flex items-center">
                    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=student%20portrait&image_size=square" alt="学生" class="rounded-full w-12 h-12 object-cover mr-4">
                    <div>
                        <h4 class="reviewer-name fw-bold text-dark mb-1">${review.reviewer_name}</h4>
                        <p class="review-date text-gray-500 text-sm">${new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
                <div class="review-rating text-yellow-400">
                    ${Array(review.rating).fill('<i class="fas fa-star"></i>').join('')}
                    ${Array(5 - review.rating).fill('<i class="far fa-star"></i>').join('')}
                </div>
            </div>
            <div class="review-content">
                <p class="text-gray-600">${review.content}</p>
            </div>
        `;
        
        reviewList.appendChild(reviewItem);
    });
}

// 评价表单提交
async function handleReviewSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
        const rating = document.querySelector('input[name="rating"]').value;
        const content = form.querySelector('#reviewContent').value;
        const reviewerName = form.querySelector('#reviewerName').value;
        
        // 显示加载状态
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> 提交中...';
        
        try {
            const { data, error } = await supabase
                .from('reviews')
                .insert({
                    rating: parseInt(rating),
                    content,
                    reviewer_name: reviewerName
                });
            
            if (error) {
                throw error;
            }
            
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
                
                // 重新加载评价列表
                loadReviews();
            }, 1000);
        } catch (error) {
            // 提交失败
            submitButton.innerHTML = '<i class="fas fa-times"></i> 提交失败';
            submitButton.classList.remove('btn-dark');
            submitButton.classList.add('btn-danger');
            alert('提交失败: ' + error.message);
            
            // 恢复按钮状态
            setTimeout(function() {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.classList.remove('btn-danger');
                submitButton.classList.add('btn-dark');
            }, 2000);
        }
    } else {
        form.classList.add('was-validated');
    }
}

// 加载师生互动话题
async function loadTopics() {
    try {
        const { data: topics, error } = await supabase
            .from('topics')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            throw error;
        }
        
        // 渲染话题列表
        renderTopics(topics);
    } catch (error) {
        console.error('加载话题失败:', error);
    }
}

// 渲染话题列表
function renderTopics(topics) {
    const topicList = document.querySelector('.topic-list');
    if (!topicList) return;
    
    // 清空现有话题
    topicList.innerHTML = '';
    
    // 添加新话题
    topics.forEach(topic => {
        const topicItem = document.createElement('div');
        topicItem.className = 'topic-item border-bottom border-gray-100 p-6 hover:bg-gray-50 transition-colors duration-300';
        
        topicItem.innerHTML = `
            <div class="topic-header d-flex justify-between items-start mb-3">
                <h4 class="topic-title fw-bold text-dark mb-0">
                    <a href="#" class="text-dark hover:text-blue-500 transition-colors duration-300">${topic.title}</a>
                </h4>
                <span class="topic-date text-gray-500 text-sm">${new Date(topic.created_at).toLocaleDateString()}</span>
            </div>
            <div class="topic-content text-gray-600 mb-4">
                <p>${topic.content}</p>
            </div>
            <div class="topic-footer d-flex justify-between items-center">
                <div class="topic-author text-gray-500 text-sm">
                    发布者：${topic.author}
                </div>
                <div class="topic-actions d-flex space-x-3">
                    <button class="btn btn-sm btn-outline-dark rounded-full px-4 py-1 hover:bg-gray-50 transition-colors duration-300">
                        <i class="fas fa-comment mr-1"></i> 回复
                    </button>
                    <button class="btn btn-sm btn-outline-dark rounded-full px-4 py-1 hover:bg-gray-50 transition-colors duration-300">
                        <i class="fas fa-thumbs-up mr-1"></i> 点赞
                    </button>
                </div>
            </div>
        `;
        
        topicList.appendChild(topicItem);
    });
}

// 话题表单提交
async function handleTopicSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
        const title = form.querySelector('#topicTitle').value;
        const content = form.querySelector('#topicContent').value;
        const author = form.querySelector('#topicAuthor').value;
        
        // 显示加载状态
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> 提交中...';
        
        try {
            const { data, error } = await supabase
                .from('topics')
                .insert({
                    title,
                    content,
                    author
                });
            
            if (error) {
                throw error;
            }
            
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
                
                // 重新加载话题列表
                loadTopics();
            }, 1000);
        } catch (error) {
            // 提交失败
            submitButton.innerHTML = '<i class="fas fa-times"></i> 提交失败';
            submitButton.classList.remove('btn-dark');
            submitButton.classList.add('btn-danger');
            alert('提交失败: ' + error.message);
            
            // 恢复按钮状态
            setTimeout(function() {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.classList.remove('btn-danger');
                submitButton.classList.add('btn-dark');
            }, 2000);
        }
    } else {
        form.classList.add('was-validated');
    }
}

// 加载作业列表
async function loadHomeworks() {
    try {
        const { data: homeworks, error } = await supabase
            .from('homeworks')
            .select('*')
            .order('deadline', { ascending: true });
        
        if (error) {
            throw error;
        }
        
        // 渲染作业列表
        renderHomeworks(homeworks);
    } catch (error) {
        console.error('加载作业失败:', error);
    }
}

// 渲染作业列表
function renderHomeworks(homeworks) {
    const homeworkList = document.querySelector('.homework-list');
    if (!homeworkList) return;
    
    // 清空现有作业
    homeworkList.innerHTML = '';
    
    // 添加新作业
    homeworks.forEach(homework => {
        const homeworkItem = document.createElement('div');
        homeworkItem.className = 'homework-item border-bottom border-gray-100 p-6 hover:bg-gray-50 transition-colors duration-300';
        
        // 计算作业状态
        let statusClass = 'bg-gray-100 text-gray-800';
        let statusText = '未开始';
        
        const now = new Date();
        const deadline = new Date(homework.deadline);
        
        if (homework.submitted) {
            statusClass = 'bg-green-100 text-green-800';
            statusText = '已提交';
        } else if (now > deadline) {
            statusClass = 'bg-red-100 text-red-800';
            statusText = '已逾期';
        } else {
            statusClass = 'bg-yellow-100 text-yellow-800';
            statusText = '进行中';
        }
        
        homeworkItem.innerHTML = `
            <div class="homework-header d-flex justify-between items-start mb-3">
                <h4 class="homework-title fw-bold text-dark mb-0">
                    <a href="#" class="text-dark hover:text-blue-500 transition-colors duration-300">${homework.title}</a>
                </h4>
                <span class="homework-status badge ${statusClass} px-3 py-1 rounded-full text-sm">${statusText}</span>
            </div>
            <div class="homework-meta d-flex items-center text-gray-500 text-sm mb-4">
                <span class="homework-deadline mr-4">
                    <i class="fas fa-calendar-alt mr-1"></i> 截止日期：${new Date(homework.deadline).toLocaleDateString()}
                </span>
                ${homework.score ? `
                <span class="homework-score">
                    <i class="fas fa-score mr-1"></i> 得分：${homework.score}
                </span>
                ` : `
                <span class="homework-score">
                    <i class="fas fa-score mr-1"></i> 未评分
                </span>
                `}
            </div>
            <div class="homework-content text-gray-600 mb-4">
                <p>${homework.description}</p>
            </div>
            <div class="homework-footer d-flex justify-between items-center">
                <div class="homework-actions d-flex space-x-3">
                    <a href="#" class="homework-detail btn btn-sm btn-outline-dark rounded-full px-4 py-1 hover:bg-gray-50 transition-colors duration-300">
                        查看详情
                    </a>
                    ${homework.submission_url ? `
                    <a href="${homework.submission_url}" target="_blank" class="homework-download btn btn-sm btn-outline-dark rounded-full px-4 py-1 hover:bg-gray-50 transition-colors duration-300">
                        查看提交
                    </a>
                    ` : `
                    <a href="#" class="homework-download btn btn-sm btn-outline-dark rounded-full px-4 py-1 hover:bg-gray-50 transition-colors duration-300">
                        下载作业
                    </a>
                    `}
                </div>
                ${homework.submitted_at ? `
                <span class="homework-submit-time text-gray-500 text-sm">
                    提交时间：${new Date(homework.submitted_at).toLocaleDateString()}
                </span>
                ` : `
                <span class="homework-submit-time text-gray-500 text-sm">
                    未提交
                </span>
                `}
            </div>
        `;
        
        homeworkList.appendChild(homeworkItem);
    });
}

// 作业提交
async function handleHomeworkSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
        const homeworkId = form.querySelector('#homeworkSelect').value;
        const homeworkFile = form.querySelector('#homeworkFile').files[0];
        const comment = form.querySelector('#homeworkComment').value;
        
        // 显示加载状态
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> 提交中...';
        
        try {
            // 上传文件到Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('homework-submissions')
                .upload(`submissions/${homeworkId}/${homeworkFile.name}`, homeworkFile);
            
            if (uploadError) {
                throw uploadError;
            }
            
            // 获取文件URL
            const { data: urlData } = supabase
                .storage
                .from('homework-submissions')
                .getPublicUrl(`submissions/${homeworkId}/${homeworkFile.name}`);
            
            // 更新作业状态
            const { data, error } = await supabase
                .from('homeworks')
                .update({
                    submitted: true,
                    submission_url: urlData.publicUrl,
                    submitted_at: new Date().toISOString(),
                    comment
                })
                .eq('id', homeworkId);
            
            if (error) {
                throw error;
            }
            
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
                
                // 重新加载作业列表
                loadHomeworks();
            }, 1000);
        } catch (error) {
            // 提交失败
            submitButton.innerHTML = '<i class="fas fa-times"></i> 提交失败';
            submitButton.classList.remove('btn-dark');
            submitButton.classList.add('btn-danger');
            alert('提交失败: ' + error.message);
            
            // 恢复按钮状态
            setTimeout(function() {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.classList.remove('btn-danger');
                submitButton.classList.add('btn-dark');
            }, 2000);
        }
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