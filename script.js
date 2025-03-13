// 页面加载时填充已保存的数据
document.addEventListener('DOMContentLoaded', function () {
    const avatarInput = document.querySelector('.avatar-input');
    const avatarImg = document.querySelector('.avatar');

    avatarInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                avatarImg.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // 初始化主题
    changeTheme('#ff66b3');
});

// 保存表单数据
document.getElementById('profile-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const profileData = {
        name: document.getElementById('name').value,
        gender: document.querySelector('input[name="gender"]:checked')?.value,
        bio: document.getElementById('bio').value
    };

    localStorage.setItem('profileData', JSON.stringify(profileData));
    alert('个人信息已保存！');
});

// 主题切换功能
function changeTheme(color) {
    const tc = tinycolor(color);
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--primary-hover', tc.darken(20).toString());
    document.documentElement.style.setProperty('--page-background', tc.lighten(40).toString());
}

// 主题选择器
const themeColors = ['#ff66b3', '#66b3ff', '#66ffb3', '#ffb366'];
const themeContainer = document.createElement('div');
themeContainer.style.position = 'fixed';
themeContainer.style.bottom = '20px';
themeContainer.style.right = '20px';
themeContainer.style.display = 'flex';
themeContainer.style.gap = '10px';

themeColors.forEach(color => {
    const colorButton = document.createElement('button');
    colorButton.style.width = '30px';
    colorButton.style.height = '30px';
    colorButton.style.borderRadius = '50%';
    colorButton.style.backgroundColor = color;
    colorButton.style.border = '2px solid white';
    colorButton.style.cursor = 'pointer';
    colorButton.addEventListener('click', () => changeTheme(color));
    themeContainer.appendChild(colorButton);
});

document.body.appendChild(themeContainer);
