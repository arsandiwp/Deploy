package authdto

type AuthRequest struct {
	FullName string `json:"fullName" validate:"required" form:"fullName"`
	UserName string `json:"username" validate:"required" form:"username"`
	Email    string `json:"email" validate:"required" form:"email"`
	Password string `json:"password" validate:"required" form:"password"`
	Gender   string `json:"gender" validate:"required" form:"gender"`
	NoHp     string `json:"no_hp" validate:"required" form:"no_hp"`
	Address  string `json:"address" validate:"required" form:"address"`
}

type LoginRequest struct {
	UserName string `json:"username" validate:"required" form:"username"`
	Password string `json:"password" validate:"required" form:"password"`
}

type LoginResponse struct {
	FullName string `json:"fullName"`
	UserName string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"-"`
	Token    string `json:"token"`
	Role     string `json:"role"`
}
